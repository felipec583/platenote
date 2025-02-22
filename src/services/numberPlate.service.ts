import { HttpError } from "../common/helpers/error.js";
import { testPlatePattern } from "../common/utils/testPlatePattern.js";
import { NumberPlateRepository } from "../repositories/number-plate/numberPlate.repository";
import { NumberPlateTypes } from "../repositories/number-plate/numberPlateRepository.interface.js";
import { NewNumberPlate } from "../types/schema";
import { NumberPlateListService } from "./";

export class NumberPlateService {
  constructor(
    private readonly numberPlateRepository: NumberPlateRepository,
    private readonly numberPlateListService: NumberPlateListService
  ) {}

  async create(numberPlate: NewNumberPlate) {
    const checkPlatePattern = testPlatePattern(numberPlate.number_plate);
    if (!checkPlatePattern)
      throw new HttpError("You must enter a valid number plate");
    return this.numberPlateRepository.create(numberPlate);
  }
  async findAll() {
    return this.numberPlateRepository.findAll();
  }

  async findBy(type: NumberPlateTypes, plate: string) {
    return this.numberPlateRepository.findBy(type, plate);
  }

  async findSuggestions(pattern: string) {
    const matchingElementsFromDatabse = await this.findFromDatabase(pattern);

    const previousList =
      await this.numberPlateListService.findPreviousFromCurrentList();

    if (!previousList) {
      return matchingElementsFromDatabse;
    }

    const mergedLists = [
      ...previousList,
      ...matchingElementsFromDatabse.filter((v) => !previousList.includes(v)),
    ];

    if (previousList.length < 5) {
      return mergedLists.slice(0, 5);
    }

    return previousList;
  }

  async findFromDatabase(pattern: string) {
    // Create a validator so you can restrain the input
    const matchingElementsFromDatabse =
      await this.numberPlateRepository.findByPattern(pattern.toUpperCase());
    return matchingElementsFromDatabse;
  }

  async delete(id: string) {
    return this.numberPlateRepository.delete(id);
  }

  async updateTenantStatus(id: string) {
    const numberPlateTenant = await this.numberPlateRepository.findBy("id", id);
    if (!numberPlateTenant)
      throw new HttpError("This number plate does not exist");
    numberPlateTenant.is_tenant = !numberPlateTenant?.is_tenant;
    const updatedNumberPlate = this.numberPlateRepository.update(
      id,
      numberPlateTenant
    );
    return updatedNumberPlate;
  }
}
