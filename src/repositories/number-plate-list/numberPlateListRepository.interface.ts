import { NewPlateList, PlateList, PlateListUpdate } from "../../types/schema";
import { Repository } from "../genericRepository";

export type NumberPlateListTypes = "day_id" | "shift_id" | "id";

export interface INumberPlateListRepository
  extends Repository<PlateList, NewPlateList, PlateListUpdate> {
  findBy(
    type: NumberPlateListTypes,
    value: string
  ): Promise<PlateList | undefined>;
  getPlateListIdByDayAndShift(
    date: string,
    shift: number
  ): Promise<{ id: string } | undefined>;
}
