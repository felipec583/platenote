import {
  FindListsParams,
  INumberPlateListRepository,
  NumberPlateListTypes,
} from "./numberPlateListRepository.interface";
import { db } from "../../config/database.js";
import { NewPlateList, PlateListUpdate } from "../../types/schema";
import { sql } from "kysely";
import { SEVEN_DAYS, CURRENT_DATE } from "../../common/constants.js";
import { getDateRange } from "../../common/helpers/getDateRange.js";
import { ListDTO } from "../../DTO/numberPlateList.dto";

export class NumberPlateListRepository implements INumberPlateListRepository {
  async create(plateList: NewPlateList) {
    return await db
      .insertInto("plate_list")
      .values(plateList)
      .returningAll()
      .executeTakeFirstOrThrow();
  }
  async delete(id: string) {
    return await db
      .deleteFrom("plate_list")
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirst();
  }
  async findBy(type: NumberPlateListTypes, value: string) {
    return await db
      .selectFrom("plate_list")
      .selectAll()
      .where(type, "=", value)
      .executeTakeFirst();
  }

  async update(id: string, entity: PlateListUpdate) {
    return await db
      .updateTable("plate_list")
      .set(entity)
      .where("id", "=", id)
      .execute();
  }

  async findById(id: string) {
    return await db
      .selectFrom("number_plate as np")
      .innerJoin("plate_entry as pe", "pe.plate_id", "np.id")
      .innerJoin("plate_list as pl", "pe.plate_list_id", "pl.id")
      .innerJoin("day as d", "d.id", "pl.day_id")
      .select([
        "np.number_plate",
        "pe.is_registered",
        "pe.has_left",
        "np.is_tenant",
      ])
      .where("pl.id", "=", id)
      .execute();
  }

  async findAll() {
    return await db.selectFrom("plate_list").selectAll().execute();
  }

  async findIdByDayAndShift(date: string, shift: number) {
    const formattedDate = new Date(date);
    return await db
      .selectFrom("plate_list as p")
      .leftJoin("day as d", "p.day_id", "d.id")
      .select(["p.id", "p.created_by"])
      .where("d.date", "=", formattedDate)
      .where("p.shift_id", "=", shift)
      .executeTakeFirst();
  }

  async findCurrent(shift: number) {
    const currentList = await db
      .selectFrom("number_plate as np")
      .innerJoin("plate_entry as pe", "pe.plate_id", "np.id")
      .innerJoin("plate_list as pl", "pe.plate_list_id", "pl.id")
      .innerJoin("day as d", "d.id", "pl.day_id")
      .select([
        "np.number_plate",
        "pe.is_registered",
        "pe.has_left",
        "np.is_tenant",
      ])
      .where(sql`d.date`, "=", sql`CURRENT_DATE`)
      .where("pl.shift_id", "=", shift)
      .execute();

    return currentList;
  }

  async findPreviousList(shift: number): Promise<ListDTO | undefined> {
    let query = db
      .selectFrom("plate_list as pl")
      .innerJoin("day as d", "d.id", "pl.day_id")
      .select(["pl.id", "pl.shift_id", "d.date"]);

    if (shift === 1) {
      query = query
        .where(sql`d.date`, "=", sql`CURRENT_DATE`)
        .where("pl.shift_id", "=", shift);
    } else {
      query = query
        .where(sql`d.date`, "=", sql`CURRENT_DATE - INTERVAL '1 day'`)
        .where("pl.shift_id", "=", shift);
    }

    const previousList = await query.execute();
    return previousList[0];
  }

  async findByDateRangeOrShift(params: FindListsParams) {
    const { shift, startDate, endDate } = params;
    let first = SEVEN_DAYS;
    let end = CURRENT_DATE;
    const ranges = getDateRange(startDate, endDate);
    if (ranges) {
      first = ranges.start;
      end = ranges.end;
    }
    let query = db
      .selectFrom("plate_list as pl")
      .innerJoin("day as d", "d.id", "pl.day_id")
      .select(["pl.id", "d.date", "pl.shift_id"])
      .where((eb) => eb.between("d.date", first, end));

    if (shift) {
      query = query.where("pl.shift_id", "=", shift);
    }
    // you might also filter by either desc or asc
    const lists = await query.orderBy("d.date", "desc").execute();
    return lists;
  }

  async findByShift(shift: number) {
    return await db
      .selectFrom("plate_list as pl")
      .innerJoin("day as d", "d.id", "pl.day_id")
      .select(["pl.id", "d.date"])
      .where("pl.shift_id", "=", shift)
      .execute();
  }
}
