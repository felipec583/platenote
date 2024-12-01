import { UserRepository } from "../repositories";
import { NewUser } from "../types/schema";
import { createUsernameFromEmail } from "../common/utils/createUsernameFromEmail";

export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async createUser(user: NewUser) {
    const { email, username } = user;
    const userName = username ?? createUsernameFromEmail(email);
    const newUser = await this.userRepository.create({
      ...user,
      username: userName,
    });
    return newUser;
  }
  async updateUser() {}
}
