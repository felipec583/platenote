
/* ^
R: READ
C: CREATE
U: UPDATE
*/
export interface Repository<R ,C, U> {
    create(entity:C):Promise<R>
    update(id:string , entity:U | string):Promise<R | object>
    delete(id:string):Promise<R  |undefined>
    findById(id:string):Promise<object | undefined>
    findAll?():Promise<R | R[]>
}