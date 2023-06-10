import { NextFunction, Request, Response } from "express";
import ApiError from "../error/ApiError.js";
import models from "../models/models.js";

const { Brand } = models;

class BrandController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { name } = req.body;
            if (!name) {
                return next(ApiError.badRequest("Name required"));
            }

            const target = await Brand.findOne({ where: { name } });
            if (target) {
                return next(ApiError.badRequest("This name already exists"));
            }

            const brand = await Brand.create({ name });
            return res.json(brand);
        } catch (error) {
            if (error instanceof Error) {
                return next(ApiError.internal(error.message));
            }
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        const brands = await Brand.findAll();
        if (!brands?.length) {
            return next(ApiError.notFound("Brands not found"));
        }

        return res.json(brands);
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        if (!id) {
            return next(ApiError.badRequest("Id required"));
        }

        const brand = await Brand.findOne({ where: { id } });
        brand && await brand.destroy();

        if (brand) {
            return res.status(200).json(brand);
        }
        return next(ApiError.notFound());
    }
}

export default new BrandController();