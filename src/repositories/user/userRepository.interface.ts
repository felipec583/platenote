import { Repository } from "../genericRepository";
import { NewUser, UserUpdate, User } from "../../types/schema";

export type UserPassword = Pick<UserUpdate, "password">;
export interface IUserRepository
  extends Repository<User, NewUser, UserUpdate> {}
