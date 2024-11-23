import { UserRepository } from "../repositories/user/user.repository";

export class PasswordService {
  constructor(private readonly userRepository: UserRepository) {}

  async changePassword() {}
  async validatePassword() {}
  async hashPassword() {}
}
