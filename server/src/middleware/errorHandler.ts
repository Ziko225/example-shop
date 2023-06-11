import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import ApiError from "../exceptions/ApiError.js";

// eslint-disable-next-line 
const errorHandler = (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message });
    }

    return res.status(500).json({ message: "Something get wrong, please try again later!" });
};

export default errorHandler;