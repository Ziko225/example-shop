import { Router } from "express";
import deviceRouter from "./deviceRouter.js";
import userRouter from "./userRouter.js";
import brandRouter from "./brandRouter.js";
import typeRouter from "./typeRouter.js";
import shoppingCartRouter from "./shoppingCartRouter.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.use("/user", userRouter);
router.use("/shoppingCart", authMiddleware, shoppingCartRouter);
router.use("/type", typeRouter);
router.use("/brand", brandRouter);
router.use("/device", deviceRouter);

export default router;