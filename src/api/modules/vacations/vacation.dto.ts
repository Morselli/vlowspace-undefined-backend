interface VacationDto {
  userId?: string;
  dateStart: Date;
  dateEnd: Date;
  ownerId?: string;
  dpId?: string;
  status?: string;
  requestedDays?: number;
}

interface ApproveVacation {
  vacationId?: string;
  id?: string; //userId
}

export { VacationDto, ApproveVacation };