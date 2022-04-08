import { Request, Response } from 'express';
import { VacationService } from './vacation.service';

class VacationController {
  async createVacation(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { userId, dateStart, dateEnd } = request.body;

    const vacationService = new VacationService();
    try {
      const vacation = await vacationService.createVacation({
        userId,
        dateEnd,
        dateStart,
      });

      return response.json(vacation);
    } catch (error) {
      return response.json({ error: error.message });
    }
  }
}

export { VacationController };
