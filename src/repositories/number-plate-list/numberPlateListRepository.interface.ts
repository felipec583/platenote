import { ListDTO, ListsDTO, PlateListDTO } from "../../DTO/numberPlateList.dto";
import { NewPlateList, PlateList, PlateListUpdate } from "../../types/schema";
import { Repository } from "../genericRepository";

export type NumberPlateListTypes = "day_id" | "shift_id" | "id";

export type PlateListId = {
  id: string;
};

export interface FindListsParams {
  shift?: number;
  startDate: Date | undefined;
  endDate: Date | undefined;
}

export interface INumberPlateListRepository
  extends Repository<PlateList, NewPlateList, PlateListUpdate> {
  findBy(
    type: NumberPlateListTypes,
    value: string
  ): Promise<PlateList | undefined>;
  findIdByDayAndShift(
    date: string,
    shift: number
  ): Promise<PlateListId | undefined>;
  findCurrent(shift: number): Promise<PlateListDTO[] | []>;
  findByShift(shift: number): Promise<ListsDTO[] | []>;
  findByDateRangeOrShift(params: FindListsParams): Promise<ListDTO[] | []>;
  findPreviousList(shift:number): Promise<ListDTO | undefined>;
}
