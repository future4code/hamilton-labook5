import { UserDatabase } from "src/data/UserDataBase";
import validateEmail from "../Util/emailValidate";
import { CustomError } from "../Util/CustomError";
import { validatePassword } from "../Util/validatePassword";
import { HashManager } from "../services/HashManager";

export class UserBusiness {
  private userDataBase = new UserDatabase();

  public async signup(
    id: string,
    name: string,
    password: string,
    email: string,
    device: string
  ) {
    const isEmail = validateEmail(email);
    if (!isEmail) {
      throw new CustomError("Email inválido!", 412);
    }

    const isPassword = validatePassword(password);
    if (!isPassword) {
      throw new CustomError("Senha inválida!", 412);
    }

    const newHash = await new HashManager().createHash(password);

    await this.userDataBase.signup(id, name, newHash, email, device);
  }
}