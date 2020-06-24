import { PostDataBase } from "src/data/PostDataBase";

export class PostBusiness {
  
  private postDataBase = new PostDataBase();

  public async toPost(
    postId: number,
    pictureUrl: string,
    description: string,
    createdOn: Date,
    userId: string,
    type?: string
  ) {
    await this.postDataBase.toPost(
      postId,
      pictureUrl,
      description,
      createdOn,
      userId,
      type
    );
  }
}
