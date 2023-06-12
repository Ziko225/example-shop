import { Router } from "express";
import basketController from "../controllers/basketController.js";

const router = Router();

router.post("/:id", basketController.addDevice);
router.get("/", basketController.getAll);
router.delete("/:id", basketController.removeDevice);
router.delete("/", basketController.removeAll);

export default router;