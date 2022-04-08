import { Request, Response } from 'express';

import { EmployeeService } from './employee.service';

class EmployeeController {
  async createEmployee(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const employeeService = new EmployeeService();

    const { admissionDate, emailCorp, email } = request.body;

    try {
      const employee = await employeeService.createEmployee({
        email,
        admissionDate,
        emailCorp,
      });

      return response.json(employee);
    } catch (error) {
      return response.json({ error: error.message });
    }
  }
}

export { EmployeeController };
