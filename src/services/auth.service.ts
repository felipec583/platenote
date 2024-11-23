import { UserService, TokenService, PasswordService } from "./";

export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly passwordSerivce: PasswordService
  ) {}

  async signUp() {}
  async logIn() {}
  async logOut() {}
}
