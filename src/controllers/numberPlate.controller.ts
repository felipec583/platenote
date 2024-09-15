import { NumberPlateService } from "../services/numberPlate.service.js";
import { Request, Response, NextFunction } from "express";
import { CustomRequest, SearchPlateRequestQuery } from "../types/main.js";
export class NumberPlateController {
  constructor(private readonly numberPlateService: NumberPlateService) {}

  async getAllPlateNumbers(_req: Request, res: Response, next: NextFunction) {
    try {
      const numberPlates = await this.numberPlateService.getAllNumberPlates();
      return res.status(200).json(numberPlates);
    } catch (error) {
      next(error);
    }
  }

  async getNumberPlatesByPattern(
    req: CustomRequest<SearchPlateRequestQuery>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { query } = req.query;
      const foundNumberPlates =
        await this.numberPlateService.findNumberPlateByPattern(query);

      return res.status(200).json({ plates: foundNumberPlates });
    } catch (error) {
      next(error);
    }
  }
  async getPlateNumber(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      console.log(id);
      const foundNumberPlate =
        await this.numberPlateService.getNumberPlateByName(id);

      return res.status(200).json(foundNumberPlate);
    } catch (error) {
      next(error);
    }
  }

  async updateTenant(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body;
      const setIsTenant = await this.numberPlateService.changeTenantStatus(id);
      return res.status(200).json(...setIsTenant);
    } catch (error) {
      next(error);
    }
  }
}
