import { NumberPlateListRepository } from "../repositories";
import { getShift } from "../common/helpers/getShift.js";
import { getNewFormattedDate } from "../common/utils/formatDate.js";
import { NewPlateList } from "../types/schema";
import { HttpError } from "../common/helpers/error.js";
import { Counter } from "../types/main.js";
export class NumberPlateListService {
  constructor(
    private readonly numberPlateListRepository: NumberPlateListRepository
  ) {}

  async create(platelist: NewPlateList) {
    const foundPlateListId =
      await this.numberPlateListRepository.findIdByDayAndShift(
        getNewFormattedDate(),
        getShift()
      );
    if (foundPlateListId) throw new HttpError("There's already a list");
    return await this.numberPlateListRepository.create(platelist);
  }

  async findLists(
    start?: string | undefined,
    end?: string | undefined,
    shift?: number
  ) {
    const startDate = start ? new Date(start) : undefined;
    const endDate = end ? new Date(end) : undefined;
    const lists = await this.numberPlateListRepository.findByDateRangeOrShift({
      shift,
      startDate,
      endDate,
    });

    return lists;
  }

  async findCurrent() {
    return await this.numberPlateListRepository.findCurrent(getShift());
  }

  async findPreviousFromCurrentList() {
    const currentShift = getShift();
    const previousShift = currentShift === 1 ? 2 : 1;
    const previous = await this.numberPlateListRepository.findPreviousList(
      previousShift
    );
    if (!previous) return;
    const { numberPlates } = await this.findById(previous.id);
    return numberPlates.map((v) => v.number_plate);
  }

  async findByShift(shift: number) {
    return await this.numberPlateListRepository.findByShift(shift);
  }

  async findById(id: string) {
    // Count each based on the boolean value of each property for entry
    const foundList = await this.numberPlateListRepository.findById(id);
    const numberPlatesCount = foundList.length;
    const incrementIfTrue = (count: number, condition: boolean): number =>
      condition ? ++count : count;
    const count = [...foundList].reduce(
      (acc, { is_registered, is_tenant, has_left }, _i) => {
        acc.hasLeft = incrementIfTrue(acc.hasLeft, has_left);
        acc.isTenant = incrementIfTrue(acc.isTenant, is_tenant);
        acc.isRegistered = incrementIfTrue(acc.isRegistered, is_registered);
        return acc;
      },
      {
        numberPlates: numberPlatesCount,
        hasLeft: 0,
        isRegistered: 0,
        isTenant: 0,
      } as Counter
    );

    return { counter: count, numberPlates: foundList };
  }

  async delete(id: string) {
    return await this.numberPlateListRepository.delete(id);
  }
}
