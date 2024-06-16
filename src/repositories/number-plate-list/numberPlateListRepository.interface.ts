import {  NewPlateList } from "../../types/schema";

export interface INumberPlateListRepository<T> {
    create(plateList:NewPlateList):Promise<T>
    delete(id:string):Promise<T  |undefined>  
    findById(id:string):Promise<T | undefined>
    findAll():Promise<T>
}