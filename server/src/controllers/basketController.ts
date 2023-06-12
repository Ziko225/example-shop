import { NextFunction, Request, Response } from "express";
import ApiError from "../exceptions/ApiError.js";
import models from "../models/models.js";
import tokenService from "../services/tokenService.js";

const { Basket, BasketDevice, Device } = models;

class BrandController {

    async addDevice(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.badRequest("Id required"));
            }

            const userId = await tokenService.findUserIdFromCookieToken(req);

            if (!userId) {
                return next(ApiError.Unauthorized());
            }

            const device = await Device.findOne({ where: { id } });
            if (!device) {
                return next(ApiError.notFound(`Device with id ${id} not found`));
            }

            const basket = await Basket.findOne({ where: { userId } });
            if (!basket) {
                return next(ApiError.Unauthorized());
            }

            const addedDevice = await BasketDevice.create({ deviceId: device.id, basketId: basket.id });
            res.json(addedDevice);

        } catch (error) {
            if (error instanceof Error) {
                return next(ApiError.internal(error.message));
            }
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = await tokenService.findUserIdFromCookieToken(req);

            if (!userId) {
                return next(ApiError.Unauthorized());
            }

            const basket = await Basket.findOne({ where: { userId } });
            if (!basket) {
                return next(ApiError.Unauthorized());
            }

            const devicesInBasket = await BasketDevice.findAll({ where: { basketId: basket.id } });

            if (!devicesInBasket[0]) {
                return next(ApiError.notFound(`Devices not found`));
            }

            return res.json(devicesInBasket);

        } catch (error) {
            if (error instanceof Error) {
                return next(ApiError.internal(error.message));
            }
        }
    }

    async removeDevice(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.badRequest("Id required"));
            }

            const userId = await tokenService.findUserIdFromCookieToken(req);
            if (!userId) {
                return next(ApiError.Unauthorized());
            }

            const basket = await Basket.findOne({ where: { userId } });
            if (!basket) {
                return next(ApiError.Unauthorized());
            }

            const result = await BasketDevice.destroy({ where: { id: id, basketId: basket.id } });

            if (!result) {
                return next(ApiError.badRequest(`Device with id ${id} not found in basket`));
            }

            return res.json({ message: `Device with id ${id} removed successfully` });

        } catch (error) {
            if (error instanceof Error) {
                return next(ApiError.internal(error.message));
            }
        }
    }

    async removeAll(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = await tokenService.findUserIdFromCookieToken(req);
            if (!userId) {
                return next(ApiError.Unauthorized());
            }

            const basket = await Basket.findOne({ where: { userId } });
            if (!basket) {
                return next(ApiError.Unauthorized());
            }

            const result = await BasketDevice.destroy({ where: { basketId: basket.id } });

            if (!result) {
                return next(ApiError.badRequest("Devices in basket not found"));
            }

            return res.json({ message: "Devices successfully removed from basket" });

        } catch (error) {
            if (error instanceof Error) {
                return next(ApiError.internal(error.message));
            }
        }
    }
}

export default new BrandController();