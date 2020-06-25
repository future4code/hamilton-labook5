import { ServerDataBase } from "./ServerDataBase";

export class FeedDataBase extends ServerDataBase {
  private static TABLE_NAME = "laBook_friend";

  public async getFeed(idFriend: string): Promise<any> {

    const feed = await this.getConnection().raw(`
      SELECT 
        post.user,
        post.id,
        post.picture_url,
        post.description,
        post.created_on,
        post.type
      FROM ${FeedDataBase.TABLE_NAME} as friend
        JOIN laBook_post as post
          ON friend.user_a = post.user
          OR friend.user_b = post.user
      WHERE 
        user_a = "${idFriend}"
        OR
        user_b = "${idFriend}"
      ORDER BY created_on DESC
  `);
    return feed[0];
  }
}
