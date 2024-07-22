import { testPlatePattern } from "../common/utils/testPlatePattern.js";
import { NumberPlateRepository } from "../repositories/number-plate/numberPlate.repository";
import { NewNumberPlate } from "../types/schema";

export class NumberPlateService {
  constructor(private readonly numberPlateRepository: NumberPlateRepository) {}

  async create(numberPlate: NewNumberPlate) {
    const checkPlatePattern = testPlatePattern(numberPlate.number_plate);
    if (!checkPlatePattern)
      throw new Error("You must enter a valid number plate");
    return this.numberPlateRepository.create(numberPlate);
  }

  async getAllNumberPlates() {
    return this.numberPlateRepository.findAll();
  }

  async getNumberPlateByName(plate: string) {
    return this.numberPlateRepository.findBy("number_plate", plate);
  }

  async deleteNumberPlate(id: string) {
    return this.numberPlateRepository.delete(id);
  }

  async changeTenantStatus(id: string) {
    const numberPlateTenant = await this.numberPlateRepository.findBy("id", id);
    console.log(numberPlateTenant);
    if (!numberPlateTenant) throw new Error("wrong");
    numberPlateTenant.is_tenant = !numberPlateTenant?.is_tenant as boolean;
    return this.numberPlateRepository.update(id, numberPlateTenant);
  }
}
