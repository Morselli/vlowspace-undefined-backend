import { Request, Response } from 'express';
import { VacationRequestService } from './vacation_request.service';

class VacationRequestController {
  async createVacationRequest(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { vacationId } = request.params;

    const vacationRequestService = new VacationRequestService();
    try {
      const vacationRequest = await vacationRequestService.createVacationRequest({
        vacationId
      });

      return response.json(vacationRequest)
    } catch (error) {
      return response.json({ error: error.message });
    }
  }
}

export { VacationRequestController }