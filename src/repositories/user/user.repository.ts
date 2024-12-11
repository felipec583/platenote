import { NewUser, User, UserUpdate } from "../../types/schema";
import { IUserRepository } from "./userRepository.interface";
import { db } from "../../config/database.js";

export class UserRepository implements IUserRepository {
  async create(entity: NewUser): Promise<User> {
    return await db
      .insertInto("user")
      .values(entity)
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async update(id: string, entity: UserUpdate) {
    return await db
      .updateTable("user")
      .set(entity)
      .where("id", "=", id)
      .returningAll()
      .execute();
  }

  async delete(id: string) {
    return await db
      .deleteFrom("user")
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirst();
  }
  async findById(id: string): Promise<object | undefined> {
    return await db.selectFrom("user").where("id", "=", id).executeTakeFirst();
  }
  async findAll(): Promise<User | User[]> {
    return await db.selectFrom("user").selectAll().execute();
  }
}
