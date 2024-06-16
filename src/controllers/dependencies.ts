import { NumberPlateRepository } from "../repositories/numberPlate.repository.js";
import { NumberPlateService } from "../services/numberPlate.service.js";
import { NumberPlateController } from "./numberPlate.controller.js";

const numberPlateRepository = new NumberPlateRepository();
const numberPlateService = new NumberPlateService(numberPlateRepository);
export const numberPlateController = new NumberPlateController(numberPlateService);
