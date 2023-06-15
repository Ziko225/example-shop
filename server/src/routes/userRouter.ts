import { Router } from "express";
import { body } from "express-validator";
import UserController from "../controllers/userController.js";

const router = Router();

router.post("/registration",
    body("email").isEmail().withMessage("Incorrect email address"),
    body("password").isLength({ min: 6, max: 32 }).withMessage("The password length must be between 6 and 32"),
    UserController.registration
);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.get("/activate/:link", UserController.activate);
router.get("/refresh", UserController.refresh);

export default router;