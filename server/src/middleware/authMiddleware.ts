import { NextFunction, Request, Response } from "express";
import ApiError from "../exceptions/ApiError.js";
import tokenService from "../services/tokenService.js";
import { JwtPayload } from "jsonwebtoken";

declare module "express" {
    interface Request {
        user?: string | JwtPayload;
    }
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
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

        if (typeof (userData) !== "string" && !userData.isActivated) {
            return next(ApiError.Unauthorized("Account is not activated"));
        }

        req.user = userData;
        next();
    } catch (error) {
        if (error instanceof Error) {
            return next(ApiError.internal(error.message));
        }
    }
};

export default authMiddleware;