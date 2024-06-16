import { INumberPlateEntryRepository } from "./numberPlateEntryRepository.interface";
import { db } from "../../config/database";
import { NewPlateEntry, PlateEntry } from "../../types/schema";

export class numberPlateEntryRepository implements INumberPlateEntryRepository<object> {
  async update(id:string, plateList: PlateEntry): Promise<object> {
    return await db.updateTable("plate_entry").set(plateList).where("id", "=", id).execute();
  }
  async delete(id: string): Promise<object | undefined> {
    return await db.deleteFrom("plate_entry").where("id", "=", id).returningAll().executeTakeFirst();
  }
  async findById(id: string): Promise<object | undefined> {
    return await db.selectFrom("plate_entry").where("id", "=", id).executeTakeFirst();
  }
  async findAll(): Promise<object> {
    throw new Error("Method not implemented.");
  }

  async create(newEntry: NewPlateEntry){
    return await db.insertInto("plate_entry").values(newEntry).executeTakeFirstOrThrow();
  }

}