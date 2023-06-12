import { Router } from "express";
import BrandController from "../controllers/brandController.js";
import authAsAdminMiddleware from "../middleware/authAsAdminMiddleware.js";

const router = Router();

router.post("/", authAsAdminMiddleware, BrandController.create);
router.get("/", BrandController.getAll);
router.delete("/:id", authAsAdminMiddleware, BrandController.remove);

export default router;