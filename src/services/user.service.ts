import { DatabaseError } from "../common/helpers/error.js";
import { UserRepository } from "../repositories";
import { NewUser } from "../types/schema";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(user: NewUser) {
    try {
      const newUser = await this.userRepository.create({
        ...user,
      });
      return newUser;
    } catch (error) {
      throw new DatabaseError(error.code, error.detail);
    }
  }
  async updateUser() {}
  async findUserByEmail(email: string) {
    const foundUser = await this.userRepository.findUserByEmail(email);
    return foundUser;
  }
}
