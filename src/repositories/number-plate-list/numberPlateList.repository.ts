import {
  INumberPlateListRepository,
  NumberPlateListTypes,
} from "./numberPlateListRepository.interface";
import { db } from "../../config/database.js";
import { NewPlateList, NumberPlateUpdate } from "../../types/schema";
export class NumberPlateListRepository implements INumberPlateListRepository {
  async create(plateList: NewPlateList) {
    return await db
      .insertInto("plate_list")
      .values(plateList)
      .returningAll()
      .executeTakeFirstOrThrow();
  }
  async delete(id: string) {
    return await db
      .deleteFrom("plate_list")
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirst();
  }
  async findBy(type: NumberPlateListTypes, value: string) {
    return await db
      .selectFrom("plate_list")
      .selectAll()
      .where(`${type}`, "=", value)
      .executeTakeFirst();
  }

  async update(id: string, entity: NumberPlateUpdate) {
    return await db
      .updateTable("number_plate")
      .set(entity)
      .where("id", "=", id)
      .execute();
  }

  async findById(id: string) {
    return await db
      .selectFrom("number_plate")
      .where("id", "=", id)
      .executeTakeFirst();
  }

  async getPlateListIdByDayAndShift(date: string, shift: number) {
    const formattedDate = new Date(date);
    return await db
      .selectFrom("plate_list as p")
      .leftJoin("day as d", "p.day_id", "d.id")
      .select("p.id")
      .where("d.date", "=", formattedDate)
      .where("p.shift_id", "=", shift)
      .executeTakeFirst();
  }

  async findAll() {
    return await db.selectFrom("plate_list").selectAll().execute();
  }
}
