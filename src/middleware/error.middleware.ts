import { BaseError } from "../common/helpers/error.js";
import { ErrorHandler } from "../types/main.js";

export const errorMiddleware: ErrorHandler = async (err, req, res, _next) => {
  if (err instanceof BaseError) {
    const formattedError = err.getFormattedError(req.url);
    return res.status(formattedError.statusCode).json({ ...formattedError });
  }
  if (err instanceof Error) {
    return res.status(500).json(err.message);
  }
};
