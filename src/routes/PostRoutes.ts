import { Router } from "express";
import { PostController } from "@controller/PostController";

export const postRoutes = Router();
const postController = new PostController()

postRoutes.post("/", postController.toPost)
