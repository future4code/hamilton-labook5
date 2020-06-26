import { CustomError } from "../util/CustomError";


export class RefreshTokenBusiness {

  async renewToken (
    user : string,
    device : string,
    userDataDevice : string
    ) {

    if (userDataDevice !== device) {
      throw new CustomError("Logue novamente!", 401);
    }

    if (!user) throw new CustomError("O usuário não existe", 400);
  }
}