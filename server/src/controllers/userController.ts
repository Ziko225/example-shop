import { NextFunction, Request, Response } from "express";
import ApiError from "../exceptions/ApiError.js";
import models from "../models/models.js";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import requestIp from "request-ip";
import TokenService from "../services/tokenService.js";
import sendActivationMail from "../services/sendActivationMail.js";

const { User, Basket } = models;

class UserController {

    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password, role } = req.body;

            if (!email || !password) {
                return next(ApiError.badRequest("Invalid email or password"));
            }

            const ip = requestIp.getClientIp(req) || "Not found";

            const target = await User.findOne({ where: { email } });
            if (target) {
                return next(ApiError.badRequest("This email is already in use"));
            }

            const hashPassword = await bcrypt.hash(password, 3);

            const activationCode = randomUUID();

            const user = await User.create({ email, role, password: hashPassword, activationLink: activationCode, });

            await Basket.create({ userId: user.id });

            const emailSendSatus = await sendActivationMail(email, activationCode);

            const tokens = await TokenService.generateToken(user);

            if (emailSendSatus?.status) {
                console.log(emailSendSatus);
                await TokenService.saveToken(user.id, tokens.RefreshToken, ip);
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