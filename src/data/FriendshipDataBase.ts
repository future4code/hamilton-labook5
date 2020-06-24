import { ServerDataBase } from "./ServerDataBase";

export class Friendship extends ServerDataBase {
  private static TABLE_NAME = "laBook_friend";

  public async createFriendship(
    idUser: string,
    idFriend: string
  ): Promise<void> {
    await this.getConnection().raw(`
          INSERT INTO ${Friendship.TABLE_NAME} (user_a, user_b)
          VALUES(
              "${idUser}",
              "${idFriend}"
          )
        `);
  }

  public async getFriendship(idUser: string, idFriend: string): Promise<any> {
    const resultDatabase = await this.getConnection().raw(`
        SELECT * FROM ${Friendship.TABLE_NAME}
        WHERE (user_a = "${idUser}" AND user_b = "${idFriend}")
        OR (user_b = "${idUser}" AND user_a = "${idFriend}")
      `);

    return resultDatabase[0];
  }
}
