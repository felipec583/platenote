import { Day, NewDay } from "../types/schema";
import { DayRepository } from "../repositories/day/dayRepository.js";
import { newFormattedDate } from "../common/utils/formatDate.js";
  
export class DayService {

  constructor (private readonly dayRepository:DayRepository){}

  async createNewDay() {
    const dayCheck = new Date().toLocaleDateString("es-CL");
    const foundCurrentDay = await this.dayRepository.find("date", dayCheck );
    if (foundCurrentDay) {
      throw new Error("This day already exists");
    }
    const newDay = await this.dayRepository.create({date:newFormattedDate()});
    return newDay;
  }
}