import jwt from "jsonwebtoken";
import models from "../models/models.js";

type User = {
    id: number;
    email: string;
    role: string;
    isActivated: boolean;
};

const { RefreshToken } = models;

class TokenService {
    async generateToken({ id, email, role, isActivated }: User, jwtKey: string) {
        const user = { userId: id, email, role, isActivated };

        const accesToken = jwt.sign(user, jwtKey, { expiresIn: "30m" });
        const RefreshToken = jwt.sign(user, jwtKey, { expiresIn: "60d" });

        return { accesToken, RefreshToken };
    }

    async saveToken(userId: number, refreshToken: string, ip: string) {
        const tokenData = await RefreshToken.findOne({ where: { userId } });

        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }

        const token = await RefreshToken.create({ userId, refreshToken, ip });
        return token;
    }
}

export default new TokenService();