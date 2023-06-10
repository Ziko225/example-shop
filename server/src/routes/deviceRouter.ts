import { Router } from "express";
import DeviceController from "../controllers/deviceController.js";

const router = Router();

router.post("/", DeviceController.create);
router.get("/", DeviceController.getAll);
router.get("/:id", DeviceController.getOne);
router.delete("/:id", DeviceController.remove);

export default router;