import { NumberPlateService } from "../services/numberPlate.service.js";

import { Request, Response } from "express";
export class NumberPlateController {
  constructor(private readonly numberPlateService: NumberPlateService) {}

  async getAllPlateNumbers(_req: Request, res: Response) {
    const numberPlates = await this.numberPlateService.getAllNumberPlates();
    return res.status(200).json(numberPlates);
  }

  async getPlateNumber(req: Request, res: Response) {
    const { id } = req.params;
    console.log(id);
    const foundNumberPlate = await this.numberPlateService.getNumberPlateByName(
      id
    );

    return res.status(200).json(foundNumberPlate);
  }

  async updateTenant(req: Request, res: Response) {
    const { id } = req.body;
    const setIsTenant = await this.numberPlateService.changeTenantStatus(id);
    console.log(setIsTenant);
    return res.status(200).send({ updatedTenant: "a" });
  }
}
