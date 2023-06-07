import { Router } from "express";
import TypeController from "../controllers/typeController.js";

const router = Router();

router.post("/create", TypeController.create);
router.get("/getAll", TypeController.getAll);
router.delete("/remove:id", TypeController.remove);

export default router;