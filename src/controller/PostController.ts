import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { PostBusiness } from "@business/PostBusiness";
import { CustomError } from "src/util/CustomError";
import { PostInputDTO } from "src/model/Post";

export class PostController {
  
  async toPost(request: Request, response: Response) {
    const { pictureUrl, description, type } = request.body;
    const token = request.headers.token as string;


    const user = new Authenticator().getData(token);
    if (!user) {
      throw new CustomError("Problemas de autenticação. Logue novamente", 401);
    }

    const postInput : PostInputDTO = {
      id: Date.now(),
      picture_url: pictureUrl,
      description,
      created_on: new Date(),
      type,
      user: user.id
    }

    await new PostBusiness().toPost( postInput );

    response.status(200).send({
      message: "Post criado com sucesso!",
    });
  }
}
