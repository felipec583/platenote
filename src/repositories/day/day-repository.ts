import { NewDay } from "../../types/schema.js";
import { IDayRepository, dayValues } from "./day-repository.interface.js";
import { db } from "../../config/db-connection.js";

export class DayRepository implements IDayRepository {
  async create(day: NewDay) {
    return await db
      .insertInto("day")
      .values(day)
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async delete(id: string) {
    return await db
      .deleteFrom("day")
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async findBy(type: dayValues, value: string) {
    return await db
      .selectFrom("day")
      .selectAll()
      .where(`${type}`, "=", value)
      .executeTakeFirst();
  }
}
