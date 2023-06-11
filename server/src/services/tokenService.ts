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
        const jswAccessKey = process.env.SECRET_KEY || "accessKey_1qw2s@d23Adx$";
        const jswRefreshKey = process.env.SECRET_KEY || "refreshKey_1qw2s@d23Adx$";

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
            const jswAccessKey = process.env.SECRET_KEY || "accessKey_1qw2s@d23Adx$";
            return jwt.verify(accessToken, jswAccessKey);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    }

    async validateRefreshToken(refreshToken: string) {
        try {
            const jswRefreshKey = process.env.SECRET_KEY || "refreshKey_1qw2s@d23Adx$";
            return jwt.verify(refreshToken, jswRefreshKey);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    }

    async removeToken(refreshToken: string) {
        return await RefreshToken.destroy({ where: { refreshToken } });
    }

    async findToken(refreshToken: string) {
        return await RefreshToken.findOne({ where: { refreshToken } });
    }
}

export default new TokenService();