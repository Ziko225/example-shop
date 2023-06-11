import { config } from "dotenv";
import jwt from "jsonwebtoken";
import models from "../models/models.js";

config();

type User = {
    id: number;
    email: string;
    role: string;
    ip: string;
    isActivated: boolean;
};

const { RefreshToken } = models;

class TokenService {
    async generateToken({ id, email, role, isActivated }: User) {
        const user = { userId: id, email, role, isActivated };
        const jwtKey = process.env.SECRET_KEY;
        if (!jwtKey) {
            throw new Error("Please, set up SECRET_KEY in .env");
        }

        const accesToken = jwt.sign(user, jwtKey, { expiresIn: "30m" });
        const RefreshToken = jwt.sign(user, jwtKey, { expiresIn: "30d" });

        return { accesToken, RefreshToken };
    }

    async saveToken(userId: number, refreshToken: string, ip: string) {
        const tokenData: any = await RefreshToken.findOne({ where: { userId } });

        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }

        const token = await RefreshToken.create({ userId, refreshToken, ip });
        return token;
    }
}

export default new TokenService();