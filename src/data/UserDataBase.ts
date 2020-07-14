import { ServerDataBase } from "./ServerDataBase";

export class UserDatabase extends ServerDataBase {
  private static TABLE_NAME = "laBook_user";

  public async signup(
    id: string,
    name: string,
    password: string,
    email: string,
    device: string,
    role: string
  ): Promise<void> {
    await this.getConnection().raw(`
            INSERT INTO ${UserDatabase.TABLE_NAME}
            VALUES(
                '${id}',
                '${name}',
                '${password}',
                '${email}',
                '${device}',
                '${role}'
            );
        `);
  }

  public async getUserByEmail(email: string): Promise<any> {
    const resultDatabase = await this.getConnection().raw(`
      SELECT * FROM ${UserDatabase.TABLE_NAME}
      WHERE email = "${email}"
    `);

    return resultDatabase[0][0];
  }

  public async getUserById(id: string): Promise<any> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ id });

    return result[0];
  }
}