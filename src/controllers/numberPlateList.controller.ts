import { DayService } from "../services/day.service";
import { NumberPlateListService } from "../services/numberPlateList.service";
import { Request, Response, NextFunction } from "express";
import { Day } from "../types/schema";
import { getShift } from "../common/helpers/getShift.js";

interface RequestParams {}

interface ResponseBody {}

interface RequestBody {}

interface RequestQuery {
  shift: number | undefined;
  start_date: string | undefined;
  end_date: string | undefined;
}

export class NumberPlateListController {
  constructor(
    private readonly platelistService: NumberPlateListService,
    private readonly dayService: DayService
  ) {}

  async createPlateList(_req: Request, res: Response, next: NextFunction) {
    try {
      const newDay: Day = await this.dayService.createNewDay();
      const dayId = newDay.id as string;
      const shiftId = getShift() as number;
      const newPlateList = await this.platelistService.create({
        day_id: dayId,
        shift_id: shiftId,
      });
      return res.status(200).json({ ...newPlateList });
    } catch (error) {
      next(error);
    }
  }

  async getCurrentList(_req: Request, res: Response, next: NextFunction) {
    try {
      const currentList = await this.platelistService.getCurrentList();
      return res.status(200).json(currentList);
    } catch (error) {
      next(error);
    }
  }

  async getListsByShift(req: Request, res: Response, next: NextFunction) {
    try {
      const { shift } = req.body;
      const listsByShift = await this.platelistService.getListsByShift(shift);
      return res.status(200).json(listsByShift);
    } catch (error) {
      next(error);
    }
  }

  async getListById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const plateList = await this.platelistService.getListById(id);
      return res.status(200).json(plateList);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const list = await this.platelistService.delete(id);
      res.status(200).json({ deletedList: list });
    } catch (error) {
      next(error);
    }
  }

  async getLists(
    req: Request<RequestParams, ResponseBody, RequestBody, RequestQuery>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const query: RequestQuery = req.query;

      let chosenShift = Number(query.shift);
      if (!query.shift) chosenShift = getShift();
      const lists = await this.platelistService.findLists(
        chosenShift,
        query.start_date,
        query.end_date
      );

      return res.status(200).json(lists);
    } catch (error) {
      next(error);
    }
  }
}
