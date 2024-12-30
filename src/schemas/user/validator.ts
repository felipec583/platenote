import { newUserSchema } from "./user.schema.js";
import { validate } from "../../middleware/index.js";

export const validateUser = validate(newUserSchema);
