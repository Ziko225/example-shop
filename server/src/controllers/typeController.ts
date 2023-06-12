import { NextFunction, Request, Response } from "express";
import models from "../models/models.js";
import ApiError from "../exceptions/ApiError.js";

const { Type } = models;

class TypeController {

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { name } = req.body;
            if (!name) {
                return next(ApiError.badRequest("Name required"));
            }

            const target = await Type.findOne({ where: { name } });
            if (target) {
                return next(ApiError.badRequest("This name already exists"));
            }

            const type = await Type.create({ name });
            return res.json(type);
        } catch (error) {
            if (error instanceof Error) {
                return next(ApiError.internal(error.message));
            }
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const types = await Type.findAll();
            if (!types?.length) {
                return next(ApiError.notFound("Types not found"));
            }

            return res.json(types);

        } catch (error) {
            if (error instanceof Error) {
                return next(ApiError.internal(error.message));
            }
        }
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.badRequest("Id required"));
            }

            const type = await Type.destroy({ where: { id } });

            if (!type) {
                return next(ApiError.notFound("Type not found"));
            }

            return res.json({ message: "Successfully removed" });

        } catch (error) {
            if (error instanceof Error) {
                return next(ApiError.internal(error.message));
            }
        }
    }
}

export default new TypeController();