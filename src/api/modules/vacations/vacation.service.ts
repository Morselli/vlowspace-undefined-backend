import { getCustomRepository } from 'typeorm';
import { Vacations } from '../../../database/entities/Vacations';
import { VacationDto } from './vacation.dto';
import { VacationRepository } from './vacation.repository';

class VacationService {
  async createVacation({
    dateEnd,
    dateStart,
    userId,
    status,
    requestedDays
  }: VacationDto): Promise<Vacations> {
    const vacationRepository = getCustomRepository(VacationRepository);

    const vacation = vacationRepository.create({
      dateEnd,
      dateStart,
      userId,
      status: 'PENDING',
      requestedDays
    });

    await vacationRepository.save(vacation);

    return vacation;
  }

  async listVacations(): Promise<Vacations[]> {
    const vacationRepository = getCustomRepository(VacationRepository);

    const vacations = vacationRepository.find({
      where: {
        status: 'PENDING',
      }
    });

    return vacations;
  }
}

export { VacationService };
