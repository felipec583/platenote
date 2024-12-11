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
  refresh_token: RefreshTokenTable;
}

export interface UserTable {
  id: Generated<string>;
  email: string;
  password: string;
  role: ColumnType<
    string,
    "operator" | "admin" | undefined,
    "operator" | "admin" | undefined
  >;
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
  is_tenant: ColumnType<boolean, boolean | undefined, boolean>;
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
export type PlateListUpdate = Updateable<PlateListTable>;

export interface PlateEntryTable {
  id: Generated<string>;
  plate_id: string;
  plate_list_id: string;
  is_registered: ColumnType<boolean, boolean | undefined, boolean | undefined>;
  has_left: ColumnType<boolean, boolean | undefined, boolean | undefined>;
  created_by: string;
}

export type PlateEntry = Selectable<PlateEntryTable>;
export type NewPlateEntry = Insertable<PlateEntryTable>;
export type PlateEntryUpdate = Updateable<PlateEntryTable>;

export interface RefreshTokenTable {
  id: Generated<string>;
  token: string;
  user_id: string;
  device_id: string;
  issued_at: string;
  expires_at: string;
}
export type RefreshToken = Selectable<RefreshTokenTable>;
export type NewRefreshToken = Insertable<RefreshTokenTable>;
export type RefreshTokenUpdate = Updateable<RefreshTokenTable>;
