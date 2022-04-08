import { Request, Response } from 'express';
import { VacationService } from './vacation.service';

class VacationController {
  async createVacation(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { dateStart, dateEnd } = request.body;
    const { id } = request.user;

    const vacationService = new VacationService();
    const start = new Date(dateStart);
    const end = new Date(dateEnd);

    const timeDiff = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    try {
      const vacation = await vacationService.createVacation({
        userId: id,
        dateEnd,
        dateStart,
        requestedDays: diffDays,
      });

      return response.json(vacation);
    } catch (error) {
      return response.json({ error: error.message });
    }
  }

  async listPendingVacations(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const vacationService = new VacationService();
    try {
      const vacations = await vacationService.listPendingVacations();
      return response.json(vacations);
    } catch (error) {
      return response.json({ error: error.message });
    }
  }

  async listVacations(request: Request, response: Response): Promise<Response> {
    const vacationService = new VacationService();
    try {
      const vacations = await vacationService.listVacations();

      return response.json(vacations);
    } catch (error) {
      return response.json({ error: error.message });
    }
  }

  async approveVacations(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const vacationService = new VacationService();
    const { id } = request.user;
    const { vacationId } = request.params;

    try {
      const vacation = await vacationService.approveVacations({
        id,
        vacationId,
      });

      return response.json(vacation);
    } catch (error) {
      return response.json({ error: error.message });
    }
  }

  async repproveVacations(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const vacationService = new VacationService();
    const { id } = request.user;
    const { vacationId } = request.params;

    const { reason } = request.body

    try {
      const vacation = await vacationService.repproveVacations({
        id,
        vacationId,
        reason
      });

      return response.json(vacation);
    } catch (error) {
      return response.json({ error: error.message });
    }
  }
}

export { VacationController };
