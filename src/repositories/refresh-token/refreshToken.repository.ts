import { IRefreshTokenRepository } from "./refreshTokenRepository.interface";
import {
  RefreshToken,
  RefreshTokenUpdate,
  NewRefreshToken,
} from "../../types/schema";
import { db } from "../../config/database.js";
export class RefreshTokenRepository implements IRefreshTokenRepository {
  async create(entity: NewRefreshToken) {
    return await db
      .insertInto("refresh_token")
      .values(entity)
      .returningAll()
      .executeTakeFirstOrThrow();
  }
  async findById(id: string): Promise<object | undefined> {
    return await db
      .selectFrom("refresh_token")
      .where("id", "=", id)
      .executeTakeFirst();
  }

  async update(
    id: string,
    entity: RefreshTokenUpdate
  ): Promise<object | RefreshToken> {
    const query = await db
      .updateTable("refresh_token")
      .set(entity)
      .where("id", "=", id)
      .execute();
    return query;
  }

  async delete(id: string): Promise<RefreshToken | undefined> {
    return await db
      .deleteFrom("refresh_token")
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirst();
  }
}
