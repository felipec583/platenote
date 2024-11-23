import { Repository } from "../genericRepository";
import { NewUser, UserUpdate, User } from "../../types/schema";
export interface IUserRepository extends Repository<User, NewUser, UserUpdate> {

}
