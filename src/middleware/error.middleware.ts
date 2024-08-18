import { BaseError } from "../common/helpers/error.js";
import { ErrorHandler } from "../types/main.js";

export const errorMiddleware: ErrorHandler = async (err, req, res, _next) => {
  if (err instanceof BaseError) {
    const formattedError = err.getFormattedError(req.url);
    res.log.error(
      { statusCode: formattedError.statusCode },
      `${formattedError.instance}: ${formattedError.message}`
    );
    return res.status(formattedError.statusCode).json({ ...formattedError });
  }
  res.log.error(err.message);
  return res.status(500).json(err.message || "Something happened");
};
