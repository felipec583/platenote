import { db } from "../../config/database.js";
import { NewNumberPlate, NumberPlateUpdate } from "../../types/schema.js";
import {
  INumberPlateRepository,
  NumberPlateTypes,
} from "../number-plate/numberPlateRepository.interface";
import { sql } from "kysely";
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
      .where(type, "=", value)
      .executeTakeFirst();
  }

  async findNumberPlatesByPrefix(prefix: string) {
    const matchedNumberPlates = await db
      .selectFrom("number_plate")
      .select("number_plate")
      .where(sql`number_plate`, "ilike", prefix + "%")
      .limit(5)
      .execute();

    const stringOnlyNumberPlates = matchedNumberPlates.map(
      (v) => v.number_plate
    );
    return stringOnlyNumberPlates;
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
