import { getCustomRepository } from 'typeorm';
import { Vacations } from '../../../database/entities/Vacations';
import { EmployeeRepository } from '../employee/employee.repository';
import { UsersRepositories } from '../user/user.repositoy';
import { ApproveVacation, VacationDto } from './vacation.dto';
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

  async listPendingVacations(): Promise<Vacations[]> {
    const vacationRepository = getCustomRepository(VacationRepository);

    const vacations = vacationRepository.find({
      where: {
        status: 'PENDING',
      }
    });

    return vacations;
  }

  async listVacations(): Promise<Vacations[]> {
    const vacationRepository = getCustomRepository(VacationRepository);

    const vacations = vacationRepository.find();

    return vacations;
  }

  //async approveVacations({
  //  id,
  //  ownerApproval,
  //  dpApproval
  //}: ApproveVacation): Promise<Vacations> {
  //  const usersRepository = getCustomRepository(UsersRepositories);
  //  const vacationRepository = getCustomRepository(VacationRepository);
//
  //  const userRole = await usersRepository.findOne({
  //    where: {
  //      id
  //    },
  //    select: ['role']
  //  })
//
  //  const vacationExist = await vacationRepository.findOne({
  //    where: {
  //      id
  //    }
  //  })
//
  //  if (userRole.role === 'MANAGER') {
  //    const vacation = await vacationRepository.update({
  //      id: vacationExist.id
  //    }, {
  //      ownerApproval
  //    })      
  //  }
//
  //  if (userRole.role === 'DP') {
  //    const vacation = vacationRepository.update({id}, {
  //      dpApproval
  //    })
//
  //    
  //  }
  //}
}

export { VacationService };
