import {
  NumberPlateRepository,
  NumberPlateEntryRepository,
  NumberPlateListRepository,
  DayRepository,
  UserRepository,
} from "../repositories/index.js";
import {
  NumberPlateService,
  DayService,
  NumberPlateEntryService,
  NumberPlateListService,
  AuthService,
  UserService,
  TokenService,
  PasswordService,
} from "../services/index.js";
import {
  AuthController,
  NumberPlateController,
  NumberPlateEntryController,
  NumberPlateListController,
} from "./index.js";

//REPOSITORIES

const numberPlateRepository = new NumberPlateRepository();
const dayRepository = new DayRepository();
const numberPlateListRepository = new NumberPlateListRepository();
const numberPlateEntryRepository = new NumberPlateEntryRepository();
const userRepository = new UserRepository();

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
const tokenService = new TokenService();
const userService = new UserService(userRepository);
const passwordService = new PasswordService(userRepository);
export const authService = new AuthService(
  userService,
  tokenService,
  passwordService
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

export const authController = new AuthController(authService);
