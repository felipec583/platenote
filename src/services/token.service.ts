import jwt from "jsonwebtoken";
import {
  AccessTokenParams,
  NewTokenParams,
  ValidationTokenParams,
} from "./types";
import { RefreshTokenRepository } from "../repositories/";
import { jwtError } from "../common/helpers/error.js";
import { ACCESS_TOKEN_KEY } from "../common/constants.js";

export class TokenService {
  constructor(private refreshTokenRepository: RefreshTokenRepository) {}


  async generateNewToken(params: NewTokenParams) {
    const { expiresIn, data, private_key } = params;
    const newToken = jwt.sign(data, private_key as string, { expiresIn });
    return newToken;
  }
  async validateToken(params: ValidationTokenParams) {
    try {
      const { token, private_key } = params;
      const verifiedToken = jwt.verify(token, private_key);
      return verifiedToken;
    } catch (error) {
      throw new jwtError(error.message, error.name);
    }
  }

  async generateAccessToken(params: AccessTokenParams) {
    const EXPIRES_IN = "1h";
    params.expiresIn = EXPIRES_IN;

    const accessToken = this.generateNewToken({
      ...params,
      private_key: ACCESS_TOKEN_KEY as string,
    });
    return accessToken;
  }
  // refresh token method
}
