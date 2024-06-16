import { db } from "../config/database.js";
import { NumberPlate, NewNumberPlate, NumberPlateUpdate } from "../types/schema";
import { INumberPlateRepository } from "./numberPlateRepository.interface";

export class NumberPlateRepository implements INumberPlateRepository<object | undefined> {
    
  async findById(id:string){
    return await db.selectFrom("number_plate").selectAll().where("id", "=", id).executeTakeFirst();
  }

  async findAll(){
    return await db.selectFrom("number_plate").selectAll().execute();
  }

  async create(
    numberPlate: NewNumberPlate
  ) {
    return await db.insertInto("number_plate").values(numberPlate).returningAll().executeTakeFirstOrThrow();
  }

  async update(id:string, updateWith: NumberPlateUpdate) {
    const query = await db.updateTable("number_plate").set(updateWith).where("id", "=", id).execute();
    return query;
  }

  async delete(id:string) {
    return await db.deleteFrom("number_plate").where("id", "=", id).returningAll().executeTakeFirst();
  }
}