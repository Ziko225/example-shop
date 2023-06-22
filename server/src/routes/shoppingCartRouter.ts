import { Router } from "express";
import shoppingCartController from "../controllers/shoppingCartController.js";

const router = Router();

router.post("/", shoppingCartController.addDevice);
router.get("/", shoppingCartController.getAll);
router.delete("/:id", shoppingCartController.removeDevice);
router.delete("/", shoppingCartController.removeAll);

export default router;