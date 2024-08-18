import { RequestHandler } from "../types/main";
import { httpLogger } from "../config/logger.js";


export const loggerMiddleware: RequestHandler = async (req, res, next) => {
  httpLogger(req, res);
  next();
};
