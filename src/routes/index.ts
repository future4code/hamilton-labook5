import { Router } from "express";
import { UserController } from "src/controller/UserController";
import { FriendshipController } from "@controller/FriendshipController";

const routes = Router();

routes.post("/signup", new UserController().signup);
routes.post("/login", new UserController().login)
routes.post("/friendship/:id", new FriendshipController().friendship)


export default routes