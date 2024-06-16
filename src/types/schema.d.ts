import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

export interface Database {
  user: UserTable;
  shift: ShiftTable;
  number_plate: NumberPlateTable;
  day: DayTable;
  plate_entry: PlateEntryTable;
  plate_list: PlateListTable;
}

export interface UserTable {
  id: Generated<string>;
  username: string;
  email: string;
  password: string;
  role: "operator" | "admin";
  refresh_token: string;
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;

export interface ShiftTable {
  id: Generated<number>;
  name: "morning" | "evening";
}

export type Shift = Selectable<ShiftTable>;

export interface NumberPlateTable {
  id: Generated<string>;
  number_plate: string;
  is_tenant: boolean;
}

export type NumberPlate = Selectable<NumberPlateTable>;
export type NewNumberPlate = Insertable<NumberPlateTable>;
export type NumberPlateUpdate = Updateable<NumberPlateTable>;

export interface DayTable {
  id: Generated<string>;
  date: ColumnType<Date, string, never>;
}

export type Day = Selectable<DayTable>;
export type NewDay = Insertable<DayTable>;
export type DayUpdate = Updateable<DayTable>;

export interface PlateListTable {
  id: Generated<string>;
  shift_id: number;
  day_id: string;
}

export type PlateList = Selectable<PlateListTable>;
export type NewPlateList = Insertable<PlateListTable>;
export type PlateListUpdate = Updateable<PlateListTable>

export interface PlateEntryTable {
  id: Generated<string>;
  plate_id: string;
  plate_list_id: string;
  is_resitered: boolean;
  has_left: boolean;
  created_by: string;
}

export type PlateEntry = Selectable<PlateEntryTable>;
export type NewPlateEntry = Insertable<PlateEntryTable>;
export type PlateEntryUpdate = Updateable<PlateEntryTable>;
