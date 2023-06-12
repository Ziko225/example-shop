import { Router } from "express";
import DeviceController from "../controllers/deviceController.js";
import authAsAdminMiddleware from "../middleware/authAsAdminMiddleware.js";

const router = Router();

router.post("/", authAsAdminMiddleware, DeviceController.create);
router.get("/", DeviceController.getAll);
router.get("/:id", DeviceController.getOne);
router.delete("/:id", authAsAdminMiddleware, DeviceController.remove);

export default router;