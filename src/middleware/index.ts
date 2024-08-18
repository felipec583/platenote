import { errorMiddleware } from "./error.middleware.js";
import { loggerMiddleware } from "./logger.middleware.js";
export const middleware = {
  errorMiddleware,
  loggerMiddleware,
};
