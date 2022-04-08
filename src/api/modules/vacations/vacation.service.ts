import { getCustomRepository } from 'typeorm';
import { Vacations } from '../../../database/entities/Vacations';
import { EmployeeRepository } from '../employee/employee.repository';
import { UsersRepositories } from '../user/user.repositoy';
import { ApproveVacation, RepproveVacation, VacationDto } from './vacation.dto';
import { VacationRepository } from './vacation.repository';

class VacationService {
  async createVacation({
    dateEnd,
    dateStart,
    userId,
    status,
    requestedDays,
  }: VacationDto): Promise<Vacations> {
    const vacationRepository = getCustomRepository(VacationRepository);

    const vacation = vacationRepository.create({
      dateEnd,
      dateStart,
      userId,
      status: 'PENDING',
      requestedDays,
    });

    await vacationRepository.save(vacation);

    return vacation;
  }

  async listPendingVacations(): Promise<Vacations[]> {
    const vacationRepository = getCustomRepository(VacationRepository);

    const vacations = vacationRepository.find({
      where: {
        status: 'PENDING',
      },
    });

    return vacations;
  }

  async listVacations(): Promise<Vacations[]> {
    const vacationRepository = getCustomRepository(VacationRepository);

    const vacations = vacationRepository.find();

    return vacations;
  }

  async approveVacations({ id, vacationId }: ApproveVacation): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepositories);
    const vacationRepository = getCustomRepository(VacationRepository);

    const userRole = await usersRepository.findOne({
      where: {
        id,
      },
      select: ['role'],
    });

    const vacationExists = await vacationRepository.findOne({
      where: { id: vacationId },
    });

    console.log(vacationExists);

    if (userRole.role === 'MANAGER') {
     await vacationRepository.update(
        {
          id: vacationExists.id,
        },
        {
          ownerApproval: id,
        },
      );
    }

    if (userRole.role === 'DP') {
      await vacationRepository.update(
        {
          id: vacationExists.id,
        },
        {
          dpApproval: id,
        },
      );
    }
  }

  async repproveVacations({ id, vacationId, reason }: RepproveVacation): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepositories);
    const vacationRepository = getCustomRepository(VacationRepository);

    const userRole = await usersRepository.findOne({
      where: {
        id,
      },
      select: ['role'],
    });

    const vacationExists = await vacationRepository.findOne({
      where: { id: vacationId },
    });

    if (userRole.role === 'MANAGER') {
     await vacationRepository.update(
        {
          id: vacationExists.id,
        },
        {
          reason: reason ? reason : " ",
          status: 'REPPROVED'
        },
      );
    }

    if (userRole.role === 'DP') {
      await vacationRepository.update(
        {
          id: vacationExists.id,
        },
        {
          reason,
          status: 'REPPROVED'
        },
      );
    }
  }
}

export { VacationService };
