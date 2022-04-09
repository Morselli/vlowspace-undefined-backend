import { getCustomRepository } from 'typeorm';
import * as tw from 'twilio';

import { Vacations } from '../../../database/entities/Vacations';
import { UsersRepositories } from '../user/user.repositoy';
import { ApproveVacation, RepproveVacation, VacationDto } from './vacation.dto';
import { VacationRepository } from './vacation.repository';
import { VACATION_STATUS, USER_ROLE } from '../../../helpers/constants';

const wppService = new tw.Twilio(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN,
);
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
      status: VACATION_STATUS.PENDING,
      requestedDays,
    });

    await vacationRepository.save(vacation);

    return vacation;
  }

  async listPendingVacations(): Promise<Vacations[]> {
    const vacationRepository = getCustomRepository(VacationRepository);

    const vacations = vacationRepository.find({
      where: {
        status: VACATION_STATUS.PENDING,
      },
      relations: ['owner', 'dp', 'user']
    });

    return vacations;
  }

  async listVacations(): Promise<Vacations[]> {
    const vacationRepository = getCustomRepository(VacationRepository);

    const vacations = vacationRepository.find({ relations: ['owner', 'dp', 'user'] });

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

    if (userRole.role === USER_ROLE.MANAGER) {
      await vacationRepository.update(
        {
          id: vacationExists.id,
        },
        {
          ownerApproval: id,
          status: VACATION_STATUS.APPROVED,
        },
      );
    }

    if (userRole.role === USER_ROLE.DP) {
      await vacationRepository.update(
        {
          id: vacationExists.id,
        },
        {
          dpApproval: id,
          status: VACATION_STATUS.APPROVED,
        },
      );

      await wppService.messages
        .create({
          body: 'Suas férias foram aprovadas!',
          from: 'whatsapp:+14155238886',
          to: 'whatsapp:+5511991836063',
        })
        .then();
    }
  }

  async repproveVacations({
    id,
    vacationId,
    reason,
  }: RepproveVacation): Promise<void> {
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

    if (userRole.role === USER_ROLE.MANAGER) {
      await vacationRepository.update(
        {
          id: vacationExists.id,
        },
        {
          reason: reason ? reason : ' ',
          status: VACATION_STATUS.REJECTED,
        },
      );

      await wppService.messages
        .create({
          body: 'Suas férias foram reprovadas!',
          from: 'whatsapp:+14155238886',
          to: 'whatsapp:+5511991836063',
        })
        .then();
    }

    if (userRole.role === USER_ROLE.DP) {
      await vacationRepository.update(
        {
          id: vacationExists.id,
        },
        {
          reason,
          status: VACATION_STATUS.REJECTED,
        },
      );

      await wppService.messages
        .create({
          body: 'Suas férias foram reprovadas!',
          from: 'whatsapp:+14155238886',
          to: 'whatsapp:+5511991836063',
        })
        .then();
    }
  }
}

export { VacationService };
