import { NewDay } from "../../types/schema";
export type dayValues = "id" | "date"
export interface IDayRepository<T> {
create(day:NewDay):Promise<T>
delete(id:string):Promise<T | undefined>
find(type:dayValues, id:string):Promise<T | undefined>
}
