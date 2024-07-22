import {
  NewPlateEntry,
  PlateEntryUpdate,
  PlateEntry,
} from "../../types/schema";
import { Repository } from "../genericRepository.js";

export type NumberEntryValuesType = "is_registered" | "has_left" | "plate_id";
export interface INumberPlateEntryRepository
  extends Repository<PlateEntry, NewPlateEntry, PlateEntryUpdate> {
  findBy(
    type: NumberEntryValuesType,
    value: string
  ): Promise<PlateEntry | undefined>;
}
