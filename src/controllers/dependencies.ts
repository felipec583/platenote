import {
  NumberPlateRepository,
  NumberPlateEntryRepository,
  NumberPlateListRepository,
  DayRepository,
} from "../repositories/index.js";
import {
  NumberPlateService,
  DayService,
  NumberPlateEntryService,
  NumberPlateListService,
} from "../services/index.js";
import {
  NumberPlateController,
  NumberPlateEntryController,
  NumberPlateListController,
} from "./index.js";

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
