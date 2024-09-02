import { db } from "../../config/database.js";
import { NewNumberPlate, NumberPlateUpdate } from "../../types/schema.js";
import {
  INumberPlateRepository,
  NumberPlateTypes,
} from "../number-plate/numberPlateRepository.interface";

export class NumberPlateRepository implements INumberPlateRepository {
  async findById(id: string): Promise<object | undefined> {
    return await db
      .selectFrom("number_plate")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirst();
  }

  async findBy(type: NumberPlateTypes, value: string) {
    return await db
      .selectFrom("number_plate")
      .selectAll()
      .where(`${type}`, "=", value)
      .executeTakeFirst();
  }

  async findAll() {
    return await db.selectFrom("number_plate").selectAll().execute();
  }

  async create(numberPlate: NewNumberPlate) {
    return await db
      .insertInto("number_plate")
      .values(numberPlate)
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async update(id: string, updateWith: NumberPlateUpdate) {
    const query = await db
      .updateTable("number_plate")
      .set(updateWith)
      .where("id", "=", id)
      .returning(["number_plate", "is_tenant"])
      .execute();
    return query;
  }

  async delete(id: string) {
    return await db
      .deleteFrom("number_plate")
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirst();
  }
}
