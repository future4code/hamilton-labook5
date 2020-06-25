import { ServerDataBase } from "./ServerDataBase";

export class FeedDataBase extends ServerDataBase {
  private static TABLE_FRIEND = "laBook_friend";
  private static TABLE_POST = "laBook_post"

  public async getAllFriends ( idUser : string) : Promise<any> {
    const friends = await this.getConnection().raw(`
      SELECT * FROM ${FeedDataBase.TABLE_FRIEND}
      WHERE user_a = "${idUser}"
      OR
      WHERE user_b = "${idUser}"
    `)

    console.log(friends[0][0])
  }
  public async getFeed(
    idFriend: string,
  ): Promise<any> {
    await this.getConnection()
    .select("*")
    .from(FeedDataBase.TABLE_POST)
    .where({id: idFriend})
  }


}
