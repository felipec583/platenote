import {
  changeStatusParams,
  INumberPlateEntryRepository,
  NumberEntryValuesType,
} from "./numberPlateEntryRepository.interface";
import { db } from "../../config/database.js";
import {
  NewPlateEntry,
  PlateEntry,
  PlateEntryUpdate,
} from "../../types/schema";

export class NumberPlateEntryRepository implements INumberPlateEntryRepository {
  async update(id: string, entity: PlateEntryUpdate) {
    return await db
      .updateTable("plate_entry")
      .set(entity)
      .where("id", "=", id)
      .execute();
  }
  async delete(id: string) {
    return await db
      .deleteFrom("plate_entry")
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirst();
  }
  async findById(id: string) {
    return await db
      .selectFrom("plate_entry")
      .where("id", "=", id)
      .executeTakeFirst();
  }
  async findAll() {
    return await db.selectFrom("plate_entry").selectAll().execute();
  }

  async findBy(type: NumberEntryValuesType[], value: string[]) {
    const [firstType, secondType] = type;
    const [firstValue, secondValue] = value;
    return await db
      .selectFrom("plate_entry")
      .selectAll()
      .where(`${firstType}`, "=", firstValue)
      .where(`${secondType}`, "=", secondValue)
      .executeTakeFirst();
  }

  async create(entity: NewPlateEntry): Promise<PlateEntry> {
    return await db
      .insertInto("plate_entry")
      .values(entity)
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async changeStatus(params: changeStatusParams) {
    const { type, value, entryId, numberPlateId } = params;
    return await db
      .updateTable("plate_entry")
      .set(type, value)
      .where("plate_id", "=", numberPlateId)
      .where("id", "=", entryId)
      .returning(["plate_id", type])
      .executeTakeFirst();
  }
}
