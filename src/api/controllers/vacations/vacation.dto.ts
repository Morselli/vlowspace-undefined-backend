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
  id?: string;
  ownerApproval?: string;
  dpApproval?: string;
}

export { VacationDto, ApproveVacation };