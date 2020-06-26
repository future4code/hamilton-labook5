import { Router } from "express";
import { RefreshTokenController } from "@controller/RefreshTokenController";

export const refreshTokenRoutes = Router();
const refreshTokenController = new RefreshTokenController();

refreshTokenRoutes.get("/renewtoken", refreshTokenController.renewToken);