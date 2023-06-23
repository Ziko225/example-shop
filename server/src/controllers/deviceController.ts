import { NextFunction, Request, Response } from "express";
import models from "../models/models.js";
import ApiError from "../exceptions/ApiError.js";
import { randomUUID } from "crypto";
import path from "path";
import { FileArray } from "express-fileupload";

const { Device, DeviceInfo } = models;

type InfoBlock = {
    title: string;
    description: string;
}[];

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

            const file: FileArray | null | undefined = req.files;
            const fileName = randomUUID() + ".jpg";

            const device = await Device.create({ name, price, brandId, typeId, img: fileName });

            if (info) {
                const parsedInfo: InfoBlock = JSON.parse(info);

                parsedInfo && parsedInfo.forEach(({ title, description }) => {
                    if (parsedInfo.filter((e) => e.title === title).length > 1) {
                        return;
                    } else {
                        DeviceInfo.create({
                            title,
                            description,
                            deviceId: device.id
                        });
                    }
                });
            }

            if (!Array.isArray(file?.img) && file?.img) {
                file.img.mv(path.resolve("src", "static", fileName));
            } else {
                next(ApiError.badRequest("Image file invalid"));
            }

            return res.json(device);
        } catch (error) {
            if (error instanceof Error) {
                return next(ApiError.internal(error.message));
            }
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const { brandId, typeId, page } = req.query;

            const selectedLimit = process.env.MAX_DEVICES_IN_PAGE;
            const limit = selectedLimit ? +selectedLimit : 20;

            let devices;

            if (!page || typeof (page) !== "string") {
                return next(ApiError.badRequest("Not all are filled in"));
            }

            const offset = +page * limit - limit;

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

            return res.json({ rows: devices.rows, count: devices.count, limit });
        } catch (error) {
            if (error instanceof Error) {
                return next(ApiError.internal(error.message));
            }
        }
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
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.badRequest("Id required"));
            }

            const device = await Device.destroy({ where: { id } });

            if (!device) {
                return next(ApiError.notFound("Device not found"));
            }

            return res.json({ message: "Successfully removed" });
        } catch (error) {
            if (error instanceof Error) {
                return next(ApiError.internal(error.message));
            }
        }
    }
}

export default new DeviceController();