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

interface RepproveVacation {
  vacationId?: string;
  id?: string;
  reason?: string;
}

export { VacationDto, ApproveVacation, RepproveVacation };