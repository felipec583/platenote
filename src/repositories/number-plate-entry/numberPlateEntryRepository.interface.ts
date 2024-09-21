import {
  NewPlateEntry,
  PlateEntryUpdate,
  PlateEntry,
} from "../../types/schema";
import { Repository } from "../genericRepository.js";

export type NumberEntryValuesType =
  | "is_registered"
  | "has_left"
  | "plate_id"
  | "plate_list_id";

export type statusType = "has_left" | "is_registered";

export type changeStatusParams = {
  type: statusType;
  numberPlateId: string;
  entryId: string;
  value: boolean;
};

export interface INumberPlateEntryRepository
  extends Repository<PlateEntry, NewPlateEntry, PlateEntryUpdate> {
  findBy(
    type: NumberEntryValuesType[],
    value: string[]
  ): Promise<PlateEntry | undefined>;
  updateStatus(
    params: changeStatusParams
  ): Promise<PlateEntryUpdate | undefined>;
}
