import { NewDay } from "../../types/schema";
import { IDayRepository } from "./dayRepository.interface";
import { db } from "../../config/database";

export class  DayRepository implements IDayRepository<object> {
  async create(day: NewDay):Promise<object> {
    return await db.insertInto("day").values(day).returningAll().executeTakeFirstOrThrow();
  }

  async delete(id: string): Promise<object | undefined> {
    return await db.deleteFrom("day").where("id", "=", id).returningAll().executeTakeFirstOrThrow();
  }

}