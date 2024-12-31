import { UserService, TokenService, PasswordService } from "./";
import { CoreUserDTO, CreateUserDTO, UserDto } from "../schemas";
import { HttpError } from "../common/helpers/error.js";
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly passwordSerivce: PasswordService
  ) {}

  async signUp(user: CreateUserDTO) {
    const { password } = user;

    const hashedPassword = await this.passwordSerivce.hashPassword(password);

    const newUser = await this.userService.createUser({
      ...user,
      password: hashedPassword,
    });

    return newUser?.email;
  }
  async logIn(user: CoreUserDTO) {
    const foundUser = await this.validateCredentials(user);
    const accessToken = await this.tokenService.generateAccessToken({
      data: { id: foundUser.id, role: foundUser.role as "operator" | "admin" },
    });
    // refreshToken creation and storing in DB
    // Checking device login
    return { foundUser, accessToken };
  }
  async logOut() {}
  async validateCredentials(user: UserDto) {
    const { email: userEmail, password } = user;

    const foundUser = await this.userService.findUserByEmail(userEmail);
    if (!foundUser) throw new HttpError("Invalid email or password");

    const passwordCheck = await this.passwordSerivce.validatePassword(
      password,
      foundUser.password
    );
    if (!passwordCheck) throw new HttpError("Invalid email or password");
    const { id, email, role } = foundUser;
    return { id, email, role };
  }

  // checking device
}
