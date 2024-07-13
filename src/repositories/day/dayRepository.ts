import { NewDay } from "../../types/schema";
import { IDayRepository, dayValues } from "./dayRepository.interface";
import { db } from "../../config/database.js";


export class  DayRepository implements IDayRepository<object> {
  async create(day: NewDay):Promise<object> {
    return await db.insertInto("day").values(day).returningAll().executeTakeFirstOrThrow();
  }

  async delete(id: string): Promise<object | undefined> {
    return await db.deleteFrom("day").where("id", "=", id).returningAll().executeTakeFirstOrThrow();
  }

  async find(type:dayValues, value:string) {
    return await db.selectFrom("day").where(`${type}`, "=", value).executeTakeFirst();
  }

}