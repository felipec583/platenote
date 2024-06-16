import { INumberPlateListRepository } from "./numberPlateListRepository.interface";
import { db } from "../../config/database";
import { NewPlateList } from "../../types/schema";
export class NumberPlateListRepository implements INumberPlateListRepository<object>{
  async create(plateList: NewPlateList): Promise<object> {
    return await db.insertInto("plate_list").values(plateList).returningAll().executeTakeFirstOrThrow();
  }
  async delete(id: string): Promise<object | undefined>   {
    return await db.deleteFrom("plate_list").where("id", "=", id).returningAll().executeTakeFirst();
  }
  async findById(id: string): Promise<object | undefined> {
    return await db.selectFrom("plate_list").selectAll().where("id", "=", id).executeTakeFirst();
  }

  async findAll() {
    return await db.selectFrom("plate_list").selectAll().execute();
  }   
}