interface VacationDto {
  userId?: string;
  dateStart: Date;
  dateEnd: Date;
  ownerId?: string;
  dpId?: string;
  status?: string;
  requestedDays?: number;
}

export { VacationDto };