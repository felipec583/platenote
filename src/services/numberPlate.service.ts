import { NumberPlateRepository } from "../repositories/numberPlate.repository";
import { NumberPlate, NumberPlateUpdate } from "../types/schema";


export class NumberPlateService {

  constructor (private readonly NumberPlateRepository: NumberPlateRepository) {
  }

  async createNumberPlate(numberPlate: NumberPlate) {
    return this.NumberPlateRepository.create(numberPlate);
  }

  async getAllNumberPlates() {
    return this.NumberPlateRepository.findAll();
  }

  async getNumberPlateByName(id:string) {
    return this.NumberPlateRepository.findById(id);
  }

  async deleteNumberPlate(id:string) {
    return this.NumberPlateRepository.delete(id);
  }

  async changeTenantStatus(id:string) {
    const numberPlateTenant = await this.NumberPlateRepository.findById(id);
    console.log(numberPlateTenant);
    if (!numberPlateTenant) throw new Error("wrong");
    numberPlateTenant.is_tenant = !numberPlateTenant?.is_tenant as boolean;
    return this.NumberPlateRepository.update(id, numberPlateTenant);
  }
}


