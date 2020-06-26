import { CommentDTO } from "src/model/Comment";
import { CommentDataBase } from "src/data/CommentDataBase";

export class CommentBusiness {
  private commentDataBase = new CommentDataBase();

  public async postComment(newComment: CommentDTO) {
    await this.commentDataBase.postComment(newComment);
  }
}
