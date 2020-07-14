import { Router } from "express";
import { CommentController } from "@controller/CommentController";

export const commentRoutes = Router();
const commentController = new CommentController()

commentRoutes.post("/", commentController.postComment)
