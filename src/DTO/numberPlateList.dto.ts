export interface PlateListDTO {
  number_plate: string;
  is_registered: boolean;
  has_left: boolean;
  is_tenant: boolean;
}

export interface ListsDTO {
  date: Date;
  id: string;
}

export interface ListDTO {
  id: string;
  date: Date;
  shift_id: number;
}