import { DayRepository } from "../repositories/day/dayRepository.js";
import { getNewFormattedDate } from "../common/utils/formatDate.js";

export class DayService {
  constructor(private readonly dayRepository: DayRepository) {}

  async createNewDay() {
    const dayCheck = getNewFormattedDate();
    const foundCurrentDay = await this.dayRepository.findBy("date", dayCheck);
    if (foundCurrentDay) {
      return foundCurrentDay;
    }
    const newDay = await this.dayRepository.create({
      date: getNewFormattedDate(),
    });

    return newDay;
  }
}
