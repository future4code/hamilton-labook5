import { ServerDataBase } from "./ServerDataBase";
import { CommentDTO } from "src/model/Comment";

export class CommentDataBase extends ServerDataBase {

  private static TABLE_NAME = "laBook_comment";

  public async postComment(comment : CommentDTO) {

    await this.getConnection().into(CommentDataBase.TABLE_NAME).insert({
      id: comment.id,
      comment: comment.comment,
      post_id: comment.post_id,
      user: comment.user,
      created_on: comment.created_on,
    });

    await ServerDataBase.destroyConnection();
  }
}
