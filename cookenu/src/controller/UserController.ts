import { Request, Response } from "express";
import { UserBusiness } from "src/business/UserBusiness";
import { IdGenerator } from "../services/IdGenetor";
import { Authenticator } from "../services/Authenticator";
import { RefreshTokenDataBase } from "../data/RefreshTokenDataBase";
import { ServerDataBase } from "../data/ServerDataBase";

export class UserController {

    async signup(
        request: Request,
        response: Response
    ) {
        const newId = new IdGenerator().generate();
        const { name, email, password, device } = request.body;
        
        await new UserBusiness().signup(
          newId,
          name,
          password,
          email,
          device
        );

        console.log("indo pro access token")

        const newAccessToken = new Authenticator().generateToken(
          {
            id: newId
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
          'token de acesso': newAccessToken,
          'refresh token': newRefreshToken
        });
      
        await ServerDataBase.destroyConnection();    
    }
}