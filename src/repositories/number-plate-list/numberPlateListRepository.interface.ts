import { ListDTO, ListsDTO, PlateListDTO } from "../../DTO/numberPlateList.dto";
import { NewPlateList, PlateList, PlateListUpdate } from "../../types/schema";
import { Repository } from "../genericRepository";

export type NumberPlateListTypes = "day_id" | "shift_id" | "id";

export type PlateListId = {
  id: string;
};

export interface INumberPlateListRepository
  extends Repository<PlateList, NewPlateList, PlateListUpdate> {
  findBy(
    type: NumberPlateListTypes,
    value: string
  ): Promise<PlateList | undefined>;
  getPlateListIdByDayAndShift(
    date: string,
    shift: number
  ): Promise<PlateListId | undefined>;
  getCurrentList(shift: number): Promise<PlateListDTO[] | []>;
  getListsByShift(shift: number): Promise<ListsDTO[] | []>;
  findLists(
    shift: number,
    startDate: Date | undefined,
    endDate: Date | undefined
  ): Promise<ListDTO[] | []>;
}
