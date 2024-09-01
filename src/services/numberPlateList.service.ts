import { NumberPlateListRepository } from "../repositories/number-plate-list/numberPlateList.repository.js";
import { getShift } from "../common/helpers/getShift.js";
import { getNewFormattedDate } from "../common/utils/formatDate.js";
import { NewPlateList } from "../types/schema";
import { HttpError } from "../common/helpers/error.js";
export class NumberPlateListService {
  constructor(
    private readonly numberPlateListRepository: NumberPlateListRepository
  ) {}

  async create(platelist: NewPlateList) {
    const foundPlateListId =
      await this.numberPlateListRepository.getPlateListIdByDayAndShift(
        getNewFormattedDate(),
        getShift()
      );
    if (foundPlateListId) throw new HttpError("There's already a list");
    return await this.numberPlateListRepository.create(platelist);
  }

  async findLists(
    shift: number,
    startDate: string | undefined,
    endDate: string | undefined
  ) {
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    const lists = await this.numberPlateListRepository.findLists(
      shift,
      start,
      end
    );

    return lists;
  }

  async getCurrentList() {
    return await this.numberPlateListRepository.getCurrentList(getShift());
  }

  async getListsByShift(shift: number) {
    return await this.numberPlateListRepository.getListsByShift(shift);
  }

  async getListById(id: string) {
    return await this.numberPlateListRepository.findById(id);
  }

  async delete(id: string) {
    return await this.numberPlateListRepository.delete(id);
  }
}
