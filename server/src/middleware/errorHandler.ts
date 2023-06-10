import { ErrorRequestHandler, Request, Response } from "express";
import ApiError from "../error/ApiError.js";

const errorHandler = (err: ErrorRequestHandler, req: Request, res: Response) => {
    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message });
    }

    return res.status(500).json({ message: "Something get wrong, please try again later!" });
};

export default errorHandler;