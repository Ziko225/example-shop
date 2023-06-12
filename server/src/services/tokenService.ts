import { Request } from "express";
import requestIp from "request-ip";
import models from "../models/models.js";
import jwt from "jsonwebtoken";

type User = {
    id: number;
    email: string;
    role: string;
    isActivated: boolean;
};

const { RefreshToken } = models;

class TokenService {

    async generateToken({ id, email, role, isActivated }: User) {
        const user = { userId: id, email, role, isActivated };

        const jswAccessKey = process.env.JWT_ACCESS_KEY;
        const jswRefreshKey = process.env.JWT_REFRESH_KEY;
        if (!jswAccessKey || !jswRefreshKey) throw new Error("Please fill in all JWT fields");

        const accesToken = jwt.sign(user, jswAccessKey, { expiresIn: "30m" });
        const RefreshToken = jwt.sign(user, jswRefreshKey, { expiresIn: "60d" });

        return { accesToken, RefreshToken };
    }

    async saveToken(userId: number, refreshToken: string, req: Request) {
        const tokenData = await RefreshToken.findOne({ where: { userId } });
        const ip = requestIp.getClientIp(req) || "Not found";

        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }

        return await RefreshToken.create({ userId, refreshToken, ip });
    }

    async validateAccessToken(accessToken: string) {
        try {
            const jswAccessKey = process.env.JWT_ACCESS_KEY;
            if (!jswAccessKey) throw new Error("Please fill in all JWT fields");

            const userData = jwt.verify(accessToken, jswAccessKey);

            return userData;
        } catch (error) {
            return null;
        }
    }

    async validateRefreshToken(refreshToken: string) {
        try {
            const jswRefreshKey = process.env.JWT_REFRESH_KEY;
            if (!jswRefreshKey) throw new Error("Please fill in all JWT fields");

            const userData = await jwt.verify(refreshToken, jswRefreshKey);

            return userData;
        } catch (error) {
            return null;
        }
    }

    async removeToken(refreshToken: string) {
        return await RefreshToken.destroy({ where: { refreshToken } });
    }

    async findToken(refreshToken: string) {
        return await RefreshToken.findOne({ where: { refreshToken } });
    }

    async findUserIdFromCookieToken(req: Request) {
        const jswRefreshKey = process.env.JWT_REFRESH_KEY;
        if (!jswRefreshKey) throw new Error("Please fill in all JWT fields");

        const { refreshToken }: { refreshToken: string; } = req.cookies;
        const userData = await jwt.decode(refreshToken);

        if (!userData || typeof (userData) === "string") {
            return new Error("Unable to find user data from token");
        }

        return userData?.userId;
    }
}

export default new TokenService();