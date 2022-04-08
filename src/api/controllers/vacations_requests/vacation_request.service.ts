import { getCustomRepository } from "typeorm";
import { VacationsRequests } from "../../../database/entities/VacationsRequests";
import { VacationRepository } from "../vacations/vacation.repository";
import { VacationRequestDto } from "./vacation_request.dto";
import { VacationRequestRepository } from "./vacation_request.repository";


class VacationRequestService {
  async createVacationRequest({
    vacationId
  }: VacationRequestDto): Promise<VacationsRequests> {
    const vacationRequestRepository = getCustomRepository(VacationRequestRepository);
    const vacationRepository = getCustomRepository(VacationRepository)

    const vacation = await vacationRepository.findOne({ id:vacationId })

    if(!vacation) {
      throw new Error('Vacation not found')
    }

    const vacationRequest = vacationRequestRepository.create({
      vacationId
    });

    await vacationRequestRepository.save(vacationRequest);

    return vacationRequest;
  }
}

export { VacationRequestService };