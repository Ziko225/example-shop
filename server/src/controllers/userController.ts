import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { randomUUID } from "crypto";
import sendActivationMail from "../services/sendActivationMail.js";
import TokenService from "../services/tokenService.js";
import ApiError from "../exceptions/ApiError.js";
import models from "../models/models.js";
import bcrypt from "bcrypt";

const { User, ShoppingCart } = models;
class UserController {

    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const error = errors.array()[0];
                return next(ApiError.badRequest(`invalid validation: ${error.msg}`));
            }

            const { email, password, role } = req.body;

            const activationCode = randomUUID();
            const hashPassword = await bcrypt.hash(password, 3);

            const target = await User.findOne({ where: { email } });
            if (target) {
                return next(ApiError.badRequest("This email is already in use"));
            }

            const user = await User.create({ email, role, password: hashPassword, activationLink: activationCode, });

            await ShoppingCart.create({ userId: user.id });

            const emailSendSatus = await sendActivationMail(email, activationCode);

            if (emailSendSatus?.status) {
                const tokens = await TokenService.generateToken(user);
                await TokenService.saveToken(user.id, tokens.refreshToken, req);

                res.cookie("refreshToken", tokens.refreshToken, { maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true });
                return res.json(tokens);
            } else {
                user.destroy();
                return next(ApiError.internal(emailSendSatus?.msg));
            }
        } catch (error) {
            if (error instanceof Error) {
                return next(ApiError.internal(error.message));
            }
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return next(ApiError.badRequest("Not all fields are filled in"));
            }

            const user = await User.findOne({ where: { email } });
            if (!user) {
                return next(ApiError.badRequest("User not found"));
            }

            if (!user.isActivated) {
                return next(ApiError.badRequest("Account not activated"));
            }

            const isPasswordsEquals = await bcrypt.compare(password, user.password);

            if (!isPasswordsEquals) {
                return next(ApiError.badRequest("The password is not correct"));
            }

            const tokens = await TokenService.generateToken(user);

            await TokenService.saveToken(user.id, tokens.refreshToken, req);

            res.cookie("refreshToken", tokens.refreshToken, { maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true });

            return res.json(tokens);
        } catch (error) {
            if (error instanceof Error) {
                return next(ApiError.internal(error.message));
            }
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken }: { refreshToken: string; } = req.cookies;
            if (!refreshToken) {
                return res.status(200);
            }

            const token = await TokenService.removeToken(refreshToken);

            res.clearCookie("refreshToken");
            return res.json(token);
        } catch (error) {
            if (error instanceof Error) {
                return next(ApiError.internal(error.message));
            }
        }
    }

    async activate(req: Request, res: Response, next: NextFunction) {
        try {
            const activationLink = req.params.link;

            const user = await User.findOne({ where: { activationLink } });
            const clientUrl = process.env.CLIENT_URL || "";

            if (!user) {
                throw new Error("Invalid activation link");
            }

            user.isActivated = true;
            await user.save();

            console.log("====================== account activated ======================");
            console.log(user.email);

            return res.redirect(clientUrl);
        } catch (error) {
            if (error instanceof Error) {
                return next(ApiError.internal(error.message));
            }
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken }: { refreshToken: string; } = req.cookies;

            if (!refreshToken) {
                return next(ApiError.Unauthorized());
            }

            const validateData = await TokenService.validateRefreshToken(refreshToken);
            const refreshTokenFromDB = await TokenService.findToken(refreshToken);
            if (!validateData || !refreshTokenFromDB) {
                return next(ApiError.Unauthorized());
            }

            const user = await User.findOne({ where: { id: refreshTokenFromDB.userId } });
            if (!user) {
                return next(ApiError.Unauthorized());
            }

            const tokens = await TokenService.generateToken(user);

            await TokenService.saveToken(user.id, tokens.refreshToken, req);

            res.cookie("refreshToken", tokens.refreshToken, { maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(tokens);
        } catch (error) {
            if (error instanceof Error) {
                return next(ApiError.internal(error.message));
            }
        }
    }
}

export default new UserController();