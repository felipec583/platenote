import {  NewNumberPlate, NumberPlateUpdate } from "../types/schema";

export interface INumberPlateRepository<T> {
    findById(plate:string):Promise<T>
    findAll():Promise<T>
    create(numberPlate: NewNumberPlate):Promise<T>
    update(id:string, updateWith: NumberPlateUpdate):Promise<T>
    delete(id:string):Promise<T>
}