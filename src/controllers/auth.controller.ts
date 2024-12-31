import { PROD } from "../common/constants.js";
import { CreateUserDTO } from "../schemas";
import { AuthService } from "../services";
import { Request, Response, NextFunction } from "express";
export class AuthController {
  constructor(readonly authservice: AuthService) {}

  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const { body } = req;
      const newUser: CreateUserDTO = body;
      const register = await this.authservice.signUp(newUser);

      return res.status(201).json(register);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { body } = req;
      const { accessToken, foundUser: user } = await this.authservice.logIn(
        body
      );
      res.cookie("accessToken", accessToken, {
        maxAge: 3600 * 60,
        secure: PROD,
        sameSite: "strict",
        httpOnly: PROD,
      });
      return res.status(200).json({ user, accessToken });
    } catch (error) {
      next(error);
    }
  }

  async createAccessToken(req: Request, res: Response, next: NextFunction) {
    try {
      //
    } catch (error) {
      next(error);
    }
  }
}
