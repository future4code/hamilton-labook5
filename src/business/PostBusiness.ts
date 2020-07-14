import { PostDataBase } from "src/data/PostDataBase";
import { PostInputDTO } from "src/model/Post";

export class PostBusiness {
  
  private postDataBase = new PostDataBase();

  public async toPost( newPost : PostInputDTO) {
    await this.postDataBase.toPost(
      newPost.id,
      newPost.picture_url,
      newPost.description,
      newPost.created_on,
      newPost.user,
      newPost.type
    );
  }
}
