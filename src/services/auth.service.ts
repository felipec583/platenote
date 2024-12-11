import { UserService, TokenService, PasswordService } from "./";
import { NewUser } from "../types/schema";
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly passwordSerivce: PasswordService
  ) {}

  async signUp(user: NewUser) {
    const { password } = user;

    const hashedPassword = await this.passwordSerivce.hashPassword(password);

    const newUser = await this.userService.createUser({
      ...user,
      password: hashedPassword,
    });

    return newUser?.email;
  }
  async logIn() {}
  async logOut() {}
}
