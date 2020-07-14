import { ServerDataBase } from "./ServerDataBase";

export class FeedDataBase extends ServerDataBase {
  private static TABLE_NAME = "laBook_friend";

  public async getFeed(
    idFriend: string,
    postsPerPage: number,
    page: number
  ): Promise<any> {

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
          (
            user_a = "${idFriend}"
        OR
            user_b = "${idFriend}"
          )
        AND post.user <> "560cb667-05f5-404d-a428-ae18da66b536"
      ORDER BY created_on DESC
      LIMIT ${postsPerPage}
      OFFSET ${page}
  `);
    return feed[0];
  }

  public async getFeedbyType(
    idFriend: string,
    type: string,
    postsPerPage: number,
    page: number
  ): Promise<any> {
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
          (user_a = "${idFriend}"
          AND
          type = '${type}'
        OR
          user_b = "${idFriend}"
          AND
          type = '${type}')
        AND post.user <> "560cb667-05f5-404d-a428-ae18da66b536"
      ORDER BY created_on DESC
      LIMIT ${postsPerPage}
      OFFSET ${page}
  `);
    return feed[0];
  }
}
