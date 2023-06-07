import { Router } from "express";
import deviceRouter from "./brandRouter.js";
import userRouter from "./userRouter.js";
import brandRouter from "./brandRouter.js";
import typeRouter from "./brandRouter.js";

const router = Router();

router.use("/user", userRouter);
router.use("/type", typeRouter);
router.use("/brand", brandRouter);
router.use("/device", deviceRouter);

export default router;