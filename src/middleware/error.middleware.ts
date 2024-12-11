import { BaseError, DatabaseError } from "../common/helpers/error.js";
import { ErrorHandler } from "../types/main.js";
import { ZodError } from "zod";

export const errorMiddleware: ErrorHandler = async (err, req, res, _next) => {
  let error;
  if (err instanceof BaseError || err instanceof DatabaseError) {
    const formattedError = err.getFormattedError(req.url);
    res.log.error(
      { statusCode: formattedError.statusCode },
      `${formattedError.instance}: ${formattedError.message}`
    );
    return res.status(formattedError.statusCode).json({ ...formattedError });
  }
  if (err instanceof ZodError) {
    error = err.issues.map((e) => ({
      path: e.path[0],
      message: e.message,
    }));
    res.log.error(error);
    return res.status(400).json(error);
  }
  res.log.error(err.message);
  return res.status(500).json(err.message || "Something happened");
};
