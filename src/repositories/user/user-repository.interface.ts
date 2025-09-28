import { Repository } from "../genericRepository.js";
import { NewUser, UserUpdate, User } from "../../types/schema.js";

export type UserPassword = Pick<UserUpdate, "password">;
export type UserEmail = Pick<User, "email">;
export interface IUserRepository extends Repository<User, NewUser, UserUpdate> {
  findUserByEmail(email: string): Promise<UserEmail | undefined>;
}
