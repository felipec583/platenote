import { z } from "zod";
import { PASSWORD_PATTERN } from "../../common/constants.js";

export const newUserSchema = z.object({
  email: z.string().trim().email({
    message: "Invalid mail address",
  }),
  password: z.string().regex(
    PASSWORD_PATTERN,
    `The password must be at least 8 characters long,
        1 uppercase letter, 1 lowercase letter , 1 digit,
        and one special character`
  ),
});

export type CreateUserDTO = z.infer<typeof newUserSchema>;
