import { Request, Response } from "express";
import { Authenticator } from "src/services/Authenticator";
import { FeedBusiness } from "@business/FeedBusiness";
import { CustomError } from "src/util/CustomError";
import { CommentDTO } from "src/model/Comment";
import { CommentDataBase } from "src/data/CommentDataBase";

export class CommentController {

  async postComment(request: Request, response: Response) {
    const token = request.headers.token as string;

    const user = new Authenticator().getData( token );
    if (!user) {
      throw new CustomError("Problemas de autenticação. Logue novamente", 401);
    }

    const commentInput: CommentDTO = {
      id: Date.now(),
      comment: request.body.comment,
      post_id: request.body.post_id,
      user: user.id,
      created_on: new Date(),
    };

    await new CommentDataBase().postComment( commentInput )

    response.status(200).send({
        message: 'Comentário postado com sucesso!'
    });
  }
}
