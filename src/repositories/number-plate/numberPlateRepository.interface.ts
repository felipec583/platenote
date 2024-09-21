import {
  NewNumberPlate,
  NumberPlateUpdate,
  NumberPlate,
} from "../../types/schema";
import { Repository } from "../genericRepository";

export type NumberPlateTypes = "id" | "is_tenant" | "number_plate";

export interface INumberPlateRepository
  extends Repository<NumberPlate, NewNumberPlate, NumberPlateUpdate> {
  findBy(
    type: NumberPlateTypes,
    value: string
  ): Promise<NumberPlate | undefined>;
  findByPattern(pattern: string): Promise<string[] | []>;
}
