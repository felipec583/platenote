import { Day, DayUpdate, NewDay } from "../../types/schema";
import { Repository } from "../genericRepository";
export type dayValues = "id" | "date"

type Rep = Pick<Repository<Day, NewDay, DayUpdate>, "create" | "delete" >

export interface IDayRepository extends Rep {
findBy(type:dayValues, value:string):Promise<Day| undefined>
}
