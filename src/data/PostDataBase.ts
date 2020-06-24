import { ServerDataBase } from "./ServerDataBase";

export class PostDataBase extends ServerDataBase {
  private static TABLE_NAME = "laBook_post";

  public async toPost(
    id: number,
    picture_url: string,
    description: string,
    created_on: Date,
    user: string,
    type?: string
  ) {
    await this.getConnection().into(PostDataBase.TABLE_NAME).insert({
      id,
      picture_url,
      description,
      created_on,
      type,
      user,
    });

    await ServerDataBase.destroyConnection();
  }
}
