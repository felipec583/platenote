import { DayService, NumberPlateListService } from "../services";
import { Request, Response, NextFunction } from "express";
import { Day } from "../types/schema";
import { getShift } from "../common/helpers/getShift.js";
import { FindListsRequestQuery, CustomRequest } from "../types/main";

export class NumberPlateListController {
  constructor(
    private readonly platelistService: NumberPlateListService,
    private readonly dayService: DayService
  ) {}

  async create(_req: Request, res: Response, next: NextFunction) {
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

  async findCurrent(_req: Request, res: Response, next: NextFunction) {
    try {
      const currentList = await this.platelistService.findCurrent();
      return res.status(200).json(currentList);
    } catch (error) {
      next(error);
    }
  }

  async findByShift(req: Request, res: Response, next: NextFunction) {
    try {
      const { shift } = req.body;
      const listsByShift = await this.platelistService.findByShift(shift);
      return res.status(200).json(listsByShift);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const plateList = await this.platelistService.findById(id);
      return res.status(200).json(plateList);
    } catch (error) {
      next(error);
    }
  }

  async findPreviousFromCurrentList(
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const previousList =
        await this.platelistService.findPreviousFromCurrentList();
      return res.status(200).json({ content: previousList ?? "No list" });
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

  async findLists(
    req: CustomRequest<FindListsRequestQuery>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const query: FindListsRequestQuery = req.query;

      const chosenShift = Number(query.shift);
      const lists = await this.platelistService.findLists(
        query.start_date,
        query.end_date,
        chosenShift
      );

      return res.status(200).json(lists);
    } catch (error) {
      next(error);
    }
  }
}
