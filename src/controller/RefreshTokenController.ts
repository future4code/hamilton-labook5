import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { RefreshTokenDataBase } from "../data/RefreshTokenDataBase";
import { ServerDataBase } from "../data/ServerDataBase";
import { UserDatabase } from "src/data/UserDataBase";
import { RefreshTokenBusiness } from "@business/RefreshTokenBusiness";

export class RefreshTokenController {

  async renewToken (request: Request, response: Response) {
    const refreshToken = request.headers.refreshtoken as string;
    const device = request.headers.device as string;

    const userData = await new RefreshTokenDataBase().getRefreshToken(
      refreshToken
    );

    const user = await new UserDatabase().getUserById( userData.userId );

    await new RefreshTokenBusiness().renewToken( user, device, userData.device )
      console.log('id', user.id, 'role', user.role, 'device', user.device)
      
    const newAccessToken = await new Authenticator().generateToken({
      id: user.id,
      role: user.role,
    });

    response.status(200).send({
      "acces token": newAccessToken,
    });

    await ServerDataBase.destroyConnection();
  }
}
