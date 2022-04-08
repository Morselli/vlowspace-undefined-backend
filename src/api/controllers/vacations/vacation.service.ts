import { getCustomRepository } from 'typeorm';
import { Vacations } from '../../../database/entities/Vacations';
import { VacationDto } from './vacation.dto';
import { VacationRepository } from './vacation.repository';
import { EmployeeRepository } from '../employee/employee.repository';

class VacationService {
  async createVacation({
    dateEnd,
    dateStart,
    userId,
  }: VacationDto): Promise<Vacations> {
    const vacationRepository = getCustomRepository(VacationRepository);
    const employeeRepository = getCustomRepository(EmployeeRepository);

    const employee = await employeeRepository.findOne({ userId });

    const vacation = vacationRepository.create({
      dateEnd,
      dateStart,
      userId: employee.userId,
    });

    await vacationRepository.save(vacation);

    return vacation;
  }
}

export { VacationService };
