import {  NewPlateEntry, PlateEntryUpdate } from "../../types/schema";

export interface INumberPlateEntryRepository<T> {
    create(plateList:NewPlateEntry):Promise<T>
    update(id:string, plateList:PlateEntryUpdate):Promise<T>
    delete(id:string):Promise<T  |undefined>  
    findById(id:string):Promise<T | undefined>
    findAll():Promise<T>
}