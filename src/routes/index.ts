import { Router } from "express";
import { UserController } from "src/controller/UserController";

const routes = Router();

routes.post("/signup", new UserController().signup);
routes.post("/login", new UserController().login)
routes.get("/friendship/:id", new UserController().friendship)


export default routes