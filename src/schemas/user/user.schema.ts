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

const userId = z.object({
  id: z.string().uuid({
    message: "This is not a valid id",
  }),
});

const userWithId = newUserSchema.merge(userId);

export type CreateUserDTO = z.infer<typeof newUserSchema>;
export type UserDto = CreateUserDTO;

export type CoreUserDTO = z.infer<typeof userWithId>;
