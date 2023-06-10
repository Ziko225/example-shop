import { NextFunction, Request, Response } from "express";
import ApiError from "../exceptions/ApiError.js";
import models from "../models/models.js";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import MailService from "../services/mailService.js";
import requestIp from "request-ip";
import TokenService from "../services/tokenService.js";

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
            const activationLink = randomUUID();
            const user: any = await User.create({ email, role, password: hashPassword, activationLink, registrationIp: ip });

            await Basket.create({ userId: user.id });

            await MailService.sendactivationMail(email, activationLink);

            const tokens = await TokenService.generateToken(user);
            await TokenService.saveToken(user.id, tokens.RefreshToken, ip);

            return res.json(tokens);

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