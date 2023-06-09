import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import ApiError from "../error/ApiError.js";

export const errorHandler = (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message });
    }

    return res.status(500).json({ message: "Something get wrong, please try again later!" });
};