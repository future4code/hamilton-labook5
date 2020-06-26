import { UserDatabase } from "src/data/UserDataBase";
import validateEmail from "../util/emailValidate";
import { CustomError } from "../util/CustomError";
import { validatePassword } from "../util/validatePassword";
import { HashManager } from "../services/HashManager";

export class UserBusiness {
  private userDataBase = new UserDatabase();

  public async signup(
    id: string,
    name: string,
    password: string,
    email: string,
    device: string, 
    role: string 
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

    await this.userDataBase.signup(id, name, newHash, email, device, role);
  }

  public async login(email: string, password: string) {
    const isEmail = validateEmail(email);
    if (!isEmail) {
      throw new CustomError("Email inválido!", 412);
    }

    const user = await new UserDatabase().getUserByEmail(email);

    if (!user) {
      throw new CustomError("Usuário inválido", 412);
    }

    const hashCompare = await new HashManager().compare(
      password,
      user.password
    );

    if (!hashCompare) {
      throw new CustomError("Invalid password", 400);
    }

    return {id: user.id, role: user.role};
  }

}