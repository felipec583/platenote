import { DayRepository } from "../repositories/day/dayRepository.js";
import { NumberPlateEntryRepository } from "../repositories/number-plate-entry/numberPlateEntry.repository.js";
import { NumberPlateListRepository } from "../repositories/number-plate-list/numberPlateList.repository.js";
import { NumberPlateRepository } from "../repositories/number-plate/numberPlate.repository.js";
import { DayService } from "../services/day.service.js";
import { NumberPlateService } from "../services/numberPlate.service.js";
import { NumberPlateEntryService } from "../services/numberPlateEntry.service.js";
import { NumberPlateListService } from "../services/numberPlateList.service.js";
import { NumberPlateController } from "./numberPlate.controller.js";
import { NumberPlateEntryController } from "./numberPlateEntry.controller.js";
import { NumberPlateListController } from "./numberPlateList.controller.js";

const numberPlateRepository = new NumberPlateRepository();
const numberPlateService = new NumberPlateService(numberPlateRepository);
export const numberPlateController = new NumberPlateController(
  numberPlateService
);

const dayRepository = new DayRepository();
const dayService = new DayService(dayRepository);

const numberPlateListRepository = new NumberPlateListRepository();
const numberPlateListService = new NumberPlateListService(
  numberPlateListRepository
);
export const numberPlateListController = new NumberPlateListController(
  numberPlateListService,
  dayService
);

const numberPlateEntryRepository = new NumberPlateEntryRepository();
const numberPlateEntryService = new NumberPlateEntryService(
  numberPlateEntryRepository,
  numberPlateListRepository,
  numberPlateService
);
export const numberPlateEntryController = new NumberPlateEntryController(
  numberPlateEntryService
);
