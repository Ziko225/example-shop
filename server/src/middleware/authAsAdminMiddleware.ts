import { NextFunction, Request, Response } from "express";
import ApiError from "../exceptions/ApiError.js";
import tokenService from "../services/tokenService.js";
import { JwtPayload } from "jsonwebtoken";

declare module "express" {
    interface Request {
        user?: string | JwtPayload;
    }
}

const authAsAdminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.Unauthorized());
        }

        const accessToken = authorizationHeader.split(" ")[1];
        if (!accessToken) {
            return next(ApiError.Unauthorized());
        }

        const userData = await tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(ApiError.Unauthorized());
        }

        if (userData && typeof (userData) !== "string" && userData.role !== "ADMIN") {
            return next(ApiError.forbidden());
        }

        next();

    } catch (error) {
        if (error instanceof Error) {
            return next(ApiError.internal(error.message));
        }
    }
};

export default authAsAdminMiddleware;