import { NumberPlateEntryService } from "../services/";
import { NextFunction, Request, Response } from "express";

export class NumberPlateEntryController {
  constructor(
    private readonly numberPlateEntryService: NumberPlateEntryService
  ) {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const created_by = "341a1495-61aa-4042-b404-5fa41ab99303";
      const { number_plate } = req.body;
      const input = {
        created_by,
        number_plate,
      };

      const newEntry = await this.numberPlateEntryService.create(input);

      return res.status(201).json({ ...newEntry });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { numberPlate } = req.body;

      const deletedEntry = await this.numberPlateEntryService.delete(
        numberPlate
      );
      return res.status(200).json({ ...deletedEntry });
    } catch (error) {
      next(error);
    }
  }

  async updateHasLeftStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { numberPlate } = req.body;

      const has_left = "has_left";

      const updatedStatus = await this.numberPlateEntryService.updateStatus(
        numberPlate,
        has_left
      );

      return res
        .status(200)
        .json({ numberPlate, message: updatedStatus });
    } catch (error) {
      next(error);
    }
  }

  async updateIsRegisteredStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { numberPlate } = req.body;

      const is_registered = "is_registered";

      const updatedStatus = await this.numberPlateEntryService.updateStatus(
        numberPlate,
        is_registered
      );

      return res.status(200).json({ numberPlate, message: updatedStatus });
    } catch (error) {
      next(error);
    }
  }

  async updateNumberPlate(req: Request, res: Response, next: NextFunction) {
    try {
      const { currentNumberPlate, newNumberPlate } = req.body;

      const updatedNumberPlate =
        await this.numberPlateEntryService.updateNumberPlate(
          currentNumberPlate,
          newNumberPlate
        );

      return res.status(200).json({ newNumberPlate: updatedNumberPlate });
    } catch (error) {
      next(error);
    }
  }
}
