import { Router } from "express";
import { FeedController } from "@controller/FeedController";

export const feedRoutes = Router();
const feedController = new FeedController()

feedRoutes.get("/", feedController.getFeed)
feedRoutes.get("/type?", feedController.getFeedByType)
