import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { randomUUID } from "crypto";
import sendActivationMail from "../services/sendActivationMail.js";
import TokenService from "../services/tokenService.js";
import requestIp from "request-ip";
import ApiError from "../exceptions/ApiError.js";
import models from "../models/models.js";
import bcrypt from "bcrypt";

const { User, Basket } = models;
class UserController {

    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (errors.array()[0].type === "field") {
                const error = errors.array()[0];
                return next(ApiError.badRequest(`invalid validation: ${error.msg}`));
            }

            const { email, password, role } = req.body;
            const jwtKey = process.env.SECRET_KEY;
            const activationCode = randomUUID();
            const hashPassword = await bcrypt.hash(password, 3);

            if (!jwtKey) {
                throw new Error("Please, set up SECRET_KEY in .env");
            }

            const ip = requestIp.getClientIp(req) || "Not found";

            const target = await User.findOne({ where: { email } });
            if (target) {
                return next(ApiError.badRequest("This email is already in use"));
            }

            const user = await User.create({ email, role, password: hashPassword, activationLink: activationCode, });

            await Basket.create({ userId: user.id });

            const emailSendSatus = await sendActivationMail(email, activationCode);

            const tokens = await TokenService.generateToken(user, jwtKey);

            if (emailSendSatus?.status) {
                await TokenService.saveToken(user.id, tokens.RefreshToken, ip);

                res.cookie("refreshToken", tokens.RefreshToken, { maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true });
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

        } catch (error) {
            if (error instanceof Error) {
                return next(ApiError.internal(error.message));
            }
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {

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

        } catch (error) {
            if (error instanceof Error) {
                return next(ApiError.internal(error.message));
            }
        }
    }
}

export default new UserController();