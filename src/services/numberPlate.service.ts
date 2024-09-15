import { HttpError } from "../common/helpers/error.js";
import { testPlatePattern } from "../common/utils/testPlatePattern.js";
import { NumberPlateRepository } from "../repositories/number-plate/numberPlate.repository";
import { NewNumberPlate } from "../types/schema";
// import { NumberPlateListService } from "./numberPlateList.service.js";

export class NumberPlateService {
  constructor(
    private readonly numberPlateRepository: NumberPlateRepository,
    // private readonly numberPlateListService: NumberPlateListService
  ) {}

  async create(numberPlate: NewNumberPlate) {
    const checkPlatePattern = testPlatePattern(numberPlate.number_plate);
    if (!checkPlatePattern)
      throw new HttpError("You must enter a valid number plate");
    return this.numberPlateRepository.create(numberPlate);
  }

  async getAllNumberPlates() {
    return this.numberPlateRepository.findAll();
  }

  async getNumberPlateByName(plate: string) {
    return this.numberPlateRepository.findBy("number_plate", plate);
  }

  async findNumberPlateByPattern(pattern: string) {
    return this.numberPlateRepository.findNumberPlatesByPrefix(pattern);
  }

  async deleteNumberPlate(id: string) {
    return this.numberPlateRepository.delete(id);
  }

  async changeTenantStatus(id: string) {
    const numberPlateTenant = await this.numberPlateRepository.findBy("id", id);
    if (!numberPlateTenant)
      throw new HttpError("This number plate does not exist");
    numberPlateTenant.is_tenant = !numberPlateTenant?.is_tenant as boolean;
    const updatedNumberPlate = this.numberPlateRepository.update(
      id,
      numberPlateTenant
    );
    return updatedNumberPlate;
  }
}
