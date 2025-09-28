import { Day, DayUpdate, NewDay } from "../../types/schema.js";
import { Repository } from "../genericRepository.js";
export type dayValues = "id" | "date";

type Rep = Pick<Repository<Day, NewDay, DayUpdate>, "create" | "delete">;
export type DateField = Pick<Day, "date">;
export interface IDayRepository extends Rep {
  findBy(type: dayValues, value: string): Promise<Day | undefined>;
}
