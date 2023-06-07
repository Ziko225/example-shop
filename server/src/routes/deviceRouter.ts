import { Router } from "express";
import DeviceController from "../controllers/device.controller.js";

const router = Router();

router.post("/create", DeviceController.create);
router.get("/getAll", DeviceController.getAll);
router.get("/getOne:id", DeviceController.getOne);
router.delete("/remove:id", DeviceController.remove);

export default router;