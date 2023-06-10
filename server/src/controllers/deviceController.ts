import { NextFunction, Request, Response } from "express";
import models from "../models/models.js";
import ApiError from "../error/ApiError.js";
import { randomUUID } from "crypto";
import path from "path";
import { FileArray } from "express-fileupload";

const { Device, DeviceInfo } = models;

type InfoBlock = {
    title: string;
    description: string;
};

class DeviceController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, price, brandId, typeId, info } = req.body;

            const target = await Device.findOne({ where: { name } });
            if (target) {
                return next(ApiError.badRequest("This name already exists"));
            }

            if (!name || !price || !brandId || !typeId) {
                return next(ApiError.badRequest("Not all fields are filled in"));
            }

            if (info) {
                JSON.parse(info).forEact(({ title, description }: InfoBlock) => DeviceInfo.create({
                    title,
                    description,
                }));
            }

            const file: FileArray | null | undefined = req.files;
            const fileName = randomUUID() + ".jpg";

            if (!Array.isArray(file?.img) && file?.img) {
                file.img.mv(path.resolve("src", "static", fileName));
            } else {
                next(ApiError.badRequest("Image file invalid"));
            }

            const device = await Device.create({ name, price, brandId, typeId, img: fileName });
            return res.json(device);

        } catch (error) {
            if (error instanceof Error) {
                return next(ApiError.internal(error.message));
            }
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        const QueryParm = req.query;
        const { brandId, typeId } = QueryParm;
        let devices,
            page = 1,
            limit = 9;

        if (QueryParm.limit) {
            limit = +QueryParm.limit;
        }

        if (QueryParm.page) {
            page = +QueryParm.page;
        }

        const offset = page * limit - limit;

        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({ limit, offset });
        }

        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({ where: { brandId }, limit, offset });
        }

        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({ where: { typeId }, limit, offset });
        }

        if (brandId && typeId) {
            devices = await Device.findAndCountAll({ where: { brandId, typeId }, limit, offset });
        }

        if (!devices) {
            return next(ApiError.notFound("Devices not found"));
        }

        return res.json(devices);
    }

    async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            if (!id) {
                return next(ApiError.badRequest("Id required"));
            }

            const device = await Device.findOne({
                where: { id },
                include: [{ model: DeviceInfo, as: "info" }]
            });

            if (device) {
                return res.status(200).json(device);
            }

            return next(ApiError.notFound());
        } catch (error) {
            if (error instanceof Error) {
                return next(ApiError.internal(error.message));
            }
        }
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;

        if (!id) {
            return next(ApiError.badRequest("Id required"));
        }

        const device = await Device.findOne({ where: { id } });

        device && await device.destroy();

        if (device) {
            return res.status(200).json(device);
        }

        return next(ApiError.notFound());
    }
}

export default new DeviceController();