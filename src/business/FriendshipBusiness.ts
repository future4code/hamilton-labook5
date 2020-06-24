import { FriendshipDatabase } from "src/data/FriendshipDataBase";

export class FriendshipBusiness {
  private friendshipDatabase = new FriendshipDatabase();

  public async createFriendship(idUSer: string, idFriend: string) {
    const getFriendship = await this.friendshipDatabase.getFriendship(
      idUSer,
      idFriend
    );

    if (getFriendship.lenght[0]) {
      throw new Error("Essa amizade já existe");
    }

    await this.friendshipDatabase.createFriendship(idUSer, idFriend);
  }
}
