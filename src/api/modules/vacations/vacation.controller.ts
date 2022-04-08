import { Request, Response } from 'express';
import { VacationService } from './vacation.service';

class VacationController {
  async createVacation(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { employeeId, dateStart, dateEnd } = request.body;
    const { ownerId, dpId } = request.params;

    const vacationService = new VacationService();
    try {
      const vacation = await vacationService.createVacation({
        employeeId,
        dateEnd,
        dateStart,
        ownerId,
        dpId,
      });

      return response.json(vacation);
    } catch (error) {
      return response.json({ error: error.message });
    }
  }
}

export { VacationController };
