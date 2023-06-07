import { Router } from "express";
import BrandController from "../controllers/brandController.js";

const router = Router();

router.post("/create", BrandController.create);
router.get("/getAll", BrandController.getAll);
router.delete("/remove:id", BrandController.remove);

export default router;