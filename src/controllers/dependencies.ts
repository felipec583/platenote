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

//REPOSITORIES

const numberPlateRepository = new NumberPlateRepository();
const dayRepository = new DayRepository();
const numberPlateListRepository = new NumberPlateListRepository();
const numberPlateEntryRepository = new NumberPlateEntryRepository();


// SERVICES
const dayService = new DayService(dayRepository);
const numberPlateListService = new NumberPlateListService(
  numberPlateListRepository
);

const numberPlateService = new NumberPlateService(
  numberPlateRepository,
  numberPlateListService
);
const numberPlateEntryService = new NumberPlateEntryService(
  numberPlateEntryRepository,
  numberPlateListRepository,
  numberPlateService
);

// CONTROLLERS
export const numberPlateController = new NumberPlateController(
  numberPlateService
);

export const numberPlateEntryController = new NumberPlateEntryController(
  numberPlateEntryService
);
export const numberPlateListController = new NumberPlateListController(
  numberPlateListService,
  dayService
);
