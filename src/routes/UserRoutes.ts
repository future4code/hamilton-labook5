import { Router } from "express";
import { UserController } from "src/controller/UserController";

export const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/signup", userController.signup);
userRoutes.post("/login", userController.login);
