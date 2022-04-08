import { getCustomRepository } from 'typeorm';
import * as tw from 'twilio';

import { Vacations } from '../../../database/entities/Vacations';
import { UsersRepositories } from '../user/user.repositoy';
import { ApproveVacation, RepproveVacation, VacationDto } from './vacation.dto';
import { VacationRepository } from './vacation.repository';

const accountSid = 'ACc5e6f051baa21d6a8ab1b827782a125d';
const authToken = '5d3cc61d4b63674180576c5ca6c8d1a2';

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
          status: 'APPROVED',
        },
      );

      const wppService = new tw.Twilio(
        process.env.ACCOUNT_SID,
        process.env.AUTH_TOKEN,
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

    if (userRole.role === 'MANAGER') {
      await vacationRepository.update(
        {
          id: vacationExists.id,
        },
        {
          reason: reason ? reason : ' ',
          status: 'REPPROVED',
        },
      );

      const wppService = new tw.Twilio(
        process.env.ACCOUNT_SID,
        process.env.AUTH_TOKEN,
      );

      await wppService.messages
        .create({
          body: 'Suas férias foram reprovadas!',
          from: 'whatsapp:+14155238886',
          to: 'whatsapp:+5511991836063',
        })
        .then();
    }

    if (userRole.role === 'DP') {
      await vacationRepository.update(
        {
          id: vacationExists.id,
        },
        {
          reason,
          status: 'REPPROVED',
        },
      );
      const wppService = new tw.Twilio(
        process.env.ACCOUNT_SID,
        process.env.AUTH_TOKEN,
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
