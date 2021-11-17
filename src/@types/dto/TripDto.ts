export type TripDTO = {
  from: string;
  to: string;
  date: Date;
  seats: number;
  companyId: number;
};

export type TripQueryDTO = {
  from?: string;
  to?: string;
  dateStart?: Date;
  dateEnd?: Date;
};

export type UpdateTripDTO = {
  from?: string;
  to?: string;
  date?: Date;
  seats?: number;
  companyId?: number;
};
