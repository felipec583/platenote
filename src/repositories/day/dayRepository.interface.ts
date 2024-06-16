import { NewDay } from "../../types/schema";

export interface IDayRepository<T> {
create(day:NewDay):Promise<T>
delete(id:string):Promise<T | undefined>
}
