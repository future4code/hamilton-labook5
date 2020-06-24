import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { ServerDataBase } from "../data/ServerDataBase";
import { FriendshipBusiness } from "@business/FriendshipBusiness";

export class FriendshipController {
  async friendship(request: Request, response: Response) {
    const token = request.headers.token as string;
    const authenticator = new Authenticator();
    const authenticationData = authenticator.getData(token);

    const idFriend = request.params.id;

    const friendshipBusiness = new FriendshipBusiness();
    await friendshipBusiness.createFriendship(authenticationData.id, idFriend);

    response.status(200).send({
      message: "Amizade criada",
    });

    await ServerDataBase.destroyConnection();
  }
}
