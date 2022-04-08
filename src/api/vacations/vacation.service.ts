import { getCustomRepository } from 'typeorm';
import { Vacations } from '../../database/entities/Vacations';
import { VacationDto } from './vacation.dto';
import { VacationRespository } from './vacation.repository';

class VacationService {
  async createVacation({
    dateEnd,
    dateStart,
    userId,
  }: VacationDto): Promise<Vacations> {
    const vacationRepository = getCustomRepository(VacationRespository);

    const vacation = vacationRepository.create({
      dateEnd,
      dateStart,
      userId,
    });

    await vacationRepository.save(vacation);

    return vacation;
  }
}

export { VacationService };
