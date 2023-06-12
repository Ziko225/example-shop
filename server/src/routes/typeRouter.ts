import { Router } from "express";
import TypeController from "../controllers/typeController.js";
import authAsAdminMiddleware from "../middleware/authAsAdminMiddleware.js";

const router = Router();

router.post("/", authAsAdminMiddleware, TypeController.create);
router.get("/", TypeController.getAll);
router.delete("/:id", authAsAdminMiddleware, TypeController.remove);

export default router;