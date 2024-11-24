import { UserRepository } from "../repositories/";
import bcrypt from "bcrypt";
export class PasswordService {
  constructor(private readonly userRepository: UserRepository) {}

  async validatePassword(password: string, hashedPassword: string) {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  }

  async hashPassword(password: string) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async updatePassword(userId: string, newPassword: string) {
    const hashedPassword = await this.hashPassword(newPassword);
    await this.userRepository.update(userId, { password: hashedPassword });
  }
}
