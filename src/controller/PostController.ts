import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { PostBusiness } from "@business/PostBusiness";
import { CustomError } from "src/util/CustomError";

export class PostController {
  async toPost(request: Request, response: Response) {
    const { pictureUrl, description, type } = request.body;
    const token = request.headers.authorization as string;

    const user = new Authenticator().getData(token);
    if (!user) {
      throw new CustomError("Problemas de autenticação. Logue novamente", 401);
    }

    await new PostBusiness().toPost(
      Date.now(),
      pictureUrl,
      description,
      new Date(),
      user.id,
      type
    );

    response.status(200).send({
      message: "Post criado com sucesso!",
    });
  }
}
