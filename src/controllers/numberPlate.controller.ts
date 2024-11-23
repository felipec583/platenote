import { NumberPlateService } from "../services";
import { Request, Response, NextFunction } from "express";
import { CustomRequest, SearchPlateRequestQuery } from "../types/main.js";
export class NumberPlateController {
  constructor(private readonly numberPlateService: NumberPlateService) {}

  async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const numberPlates = await this.numberPlateService.findAll();
      return res.status(200).json(numberPlates);
    } catch (error) {
      next(error);
    }
  }

  async findByPattern(
    req: CustomRequest<SearchPlateRequestQuery>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { query } = req.query;
      const foundNumberPlates = await this.numberPlateService.findFromDatabase(
        query
      );

      return res.status(200).json({ plates: foundNumberPlates });
    } catch (error) {
      next(error);
    }
  }

  async findSuggestions(
    req: CustomRequest<SearchPlateRequestQuery>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { query } = req.query;
      const foundPlateSuggestions =
        await this.numberPlateService.findSuggestions(query);
      return res.status(200).json(foundPlateSuggestions);
    } catch (error) {
      next(error);
    }
  }
  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      console.log(id);
      const foundNumberPlate = await this.numberPlateService.findBy("id", id);

      return res.status(200).json(foundNumberPlate);
    } catch (error) {
      next(error);
    }
  }

  async updateTenant(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body;
      const setIsTenant = await this.numberPlateService.updateTenantStatus(id);
      return res.status(200).json(...setIsTenant);
    } catch (error) {
      next(error);
    }
  }
}
