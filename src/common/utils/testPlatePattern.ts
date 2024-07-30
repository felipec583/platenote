import { PLATE_PATTERN } from "../constants.js";

export const testPlatePattern = (plate: string) =>
  new RegExp(PLATE_PATTERN, "i").test(plate);
