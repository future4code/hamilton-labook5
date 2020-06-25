import { Router } from "express";
import { FriendshipController } from "@controller/FriendshipController";

export const friendshipRoutes = Router();
const friendshipController = new FriendshipController()

friendshipRoutes.post("/:id", friendshipController.createFriendship)
friendshipRoutes.delete("/:id", friendshipController.deleteFriendship)
