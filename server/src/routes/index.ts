import { Router } from "express";
import deviceRouter from "./deviceRouter.js";
import userRouter from "./userRouter.js";
import brandRouter from "./brandRouter.js";
import typeRouter from "./typeRouter.js";
import basketRouter from "./basketRouter.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.use("/user", userRouter);
router.use("/basket", authMiddleware, basketRouter);
router.use("/type", typeRouter);
router.use("/brand", brandRouter);
router.use("/device", deviceRouter);

export default router;