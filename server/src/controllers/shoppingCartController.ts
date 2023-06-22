import { NextFunction, Request, Response } from "express";
import ApiError from "../exceptions/ApiError.js";
import models from "../models/models.js";
import tokenService from "../services/tokenService.js";

const { ShoppingCart, ShoppingCartDevice, Device } = models;

class BrandController {

    async addDevice(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.body;
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

            const shoppingCart = await ShoppingCart.findOne({ where: userId });
            if (!shoppingCart) {
                return next(ApiError.Unauthorized());
            }

            const addedDevice = await ShoppingCartDevice.create({ deviceId: device.id, shoppingCartId: shoppingCart.id });
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

            const shoppingCart = await ShoppingCart.findOne({ where: userId });
            if (!shoppingCart) {
                return next(ApiError.Unauthorized());
            }

            const devicesInShoppingCart = await ShoppingCartDevice.findAll(
                {
                    where: { shoppingCartId: shoppingCart.id },
                    include: [{ model: Device, as: "device" }]
                });

            if (!devicesInShoppingCart[0]) {
                return next(ApiError.notFound(`Devices not found`));
            }

            return res.json(devicesInShoppingCart);

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

            const shoppingCart = await ShoppingCart.findOne({ where: userId });
            if (!shoppingCart) {
                return next(ApiError.Unauthorized());
            }

            const result = await ShoppingCartDevice.destroy({ where: { id: id, shoppingCartId: shoppingCart.id } });

            if (!result) {
                return next(ApiError.badRequest(`Device with id ${id} not found in shoppingCart`));
            }

            return res.json({ message: `Device removed successfully` });

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

            const shoppingCart = await ShoppingCart.findOne({ where: userId });
            if (!shoppingCart) {
                return next(ApiError.Unauthorized());
            }

            const result = await ShoppingCartDevice.destroy({ where: { shoppingCartId: shoppingCart.id } });

            if (!result) {
                return next(ApiError.badRequest("Device not found"));
            }

            return res.json({ message: "Devices successfully removed from shoppingCart" });

        } catch (error) {
            if (error instanceof Error) {
                return next(ApiError.internal(error.message));
            }
        }
    }
}

export default new BrandController();