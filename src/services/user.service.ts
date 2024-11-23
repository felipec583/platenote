import { UserRepository } from "../repositories/user/user.repository";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
}
