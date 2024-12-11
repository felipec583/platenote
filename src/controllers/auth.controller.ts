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
}
