import { Router } from "express";
import { UserController } from "src/controller/UserController";
import { FriendshipController } from "@controller/FriendshipController";
import { PostController } from "@controller/PostController";

const routes = Router();

routes.post("/signup", new UserController().signup);
routes.post("/login", new UserController().login)
routes.post("/friendship/:id", new FriendshipController().createFriendship)
routes.delete("/friendship/:id", new FriendshipController().deleteFriendship)
routes.post("/user/post", new PostController().toPost)


export default routes