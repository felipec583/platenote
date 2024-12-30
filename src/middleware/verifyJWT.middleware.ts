import { ACCESS_TOKEN_KEY } from "../common/constants.js";
import { tokenService } from "../controllers/dependencies.js";
import { JWTpayloadI, RequestHandler } from "../types/main";

export const verifyTokenMiddleware: RequestHandler = async (req, res, next) => {
  try {
    const token = req.header("authorization")?.split(" ")[1];
    const decoded = await tokenService.validateToken({
      private_key: ACCESS_TOKEN_KEY as string,
      token: token as string,
    });
    req.token = decoded as JWTpayloadI;
    next();
  } catch (error) {
    next(error);
  }
};
