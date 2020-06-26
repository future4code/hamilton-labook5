import { Request, Response } from "express";
import { UserBusiness } from "src/business/UserBusiness";
import { IdGenerator } from "../services/IdGenetor";
import { Authenticator } from "../services/Authenticator";
import { RefreshTokenDataBase } from "../data/RefreshTokenDataBase";
import { ServerDataBase } from "../data/ServerDataBase";

export class UserController {
  async signup(request: Request, response: Response) {
    const newId = new IdGenerator().generate();
    const { name, email, password, device, role } = request.body;

    await new UserBusiness().signup(newId, name, password, email, device, role);

    const newAccessToken = new Authenticator().generateToken(
      {
        id: newId,
        role,
      },
      "1d"
    );

    const newRefreshToken = new Authenticator().generateToken(
      {
        id: newId,
        device: device,
      },
      process.env.REFRESH_TOKEN_EXPIRES_IN
    );

    await new RefreshTokenDataBase().storeRefreshToken(
      newRefreshToken,
      device,
      true,
      newId
    );

    response.status(200).send({
      message: "Usuário criado com sucesso!",
      "token de acesso": newAccessToken,
      "refresh token": newRefreshToken,
    });

    await ServerDataBase.destroyConnection();
  }

  async login(request: Request, response: Response) {
    const { email, password, device } = request.body;
    const user = await new UserBusiness().login(email, password);

    const authenticator = new Authenticator();
    const accessToken = authenticator.generateToken(
      { id: user.id, role: user.role },
      "1d"
    );

    const refreshToken = authenticator.generateToken(
      { id: user.id, device },
      process.env.REFRESH_TOKEN_EXPIRES_IN
    );

    const refreshTokenDatabase = new RefreshTokenDataBase();
    const retrievedTokenFromDatabase = await refreshTokenDatabase.getRefreshTokenByIdAndDevice(
      user.id,
      device
    );

    if (retrievedTokenFromDatabase) {
      await refreshTokenDatabase.deleteRefreshToken(
        retrievedTokenFromDatabase.token
      );
    }

    await refreshTokenDatabase.storeRefreshToken(
      refreshToken,
      device,
      true,
      user.id
    );

    response.status(200).send({
      accessToken,
      refreshToken,
    });

    await ServerDataBase.destroyConnection();
  }
}
