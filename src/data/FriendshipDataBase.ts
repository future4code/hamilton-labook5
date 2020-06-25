import { ServerDataBase } from "./ServerDataBase";

export class FriendshipDatabase extends ServerDataBase {
  private static TABLE_NAME = "laBook_friend";

  public async createFriendship(
    idUser: string,
    idFriend: string
  ): Promise<void> {
    await this.getConnection().raw(`
          INSERT INTO ${FriendshipDatabase.TABLE_NAME} (user_a, user_b)
          VALUES(
              "${idUser}",
              "${idFriend}"
          )
        `);
  }

  public async getFriendship(idUser: string, idFriend: string): Promise<any> {
    const resultDatabase = await this.getConnection().raw(`
        SELECT * FROM ${FriendshipDatabase.TABLE_NAME}
        WHERE (user_a = "${idUser}" AND user_b = "${idFriend}")
        OR (user_b = "${idUser}" AND user_a = "${idFriend}")
      `);

    return resultDatabase[0];
  }

  public async deleteFriendship(idUser: string, idFriend: string): Promise<void> {
    await this.getConnection().raw(`
      DELETE FROM ${FriendshipDatabase.TABLE_NAME}
      WHERE (user_a = "${idUser}" AND user_b = "${idFriend}")
      OR (user_b = "${idUser}" AND user_a = "${idFriend}")
    `)
  }
}