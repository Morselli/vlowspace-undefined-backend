import { getCustomRepository } from 'typeorm';

import { Employee } from '../../database/entity/Employee';
import { UsersRepositories } from '../user/user.repositoy';
import { EmployeeDto } from './employee.dto';
import { EmployeeRepository } from './employee.repository';

class EmployeeService {
  async createEmployee({
    email,
    admissionDate,
    emailCorp,
    fullName,
    userId,
  }: EmployeeDto): Promise<Employee> {
    const employeeRepository = getCustomRepository(EmployeeRepository);
    const usersRepository = getCustomRepository(UsersRepositories);

    const user = await usersRepository.findOne({ email });

    if (!user) {
      throw new Error('User not found');
    }

    const employee = employeeRepository.create({
      email: user.email,
      emailCorp,
      fullName: user.name,
      userId: user.id,
      admissionDate,
    });

    await employeeRepository.save(employee);

    return employee;
  }
}

export { EmployeeService };
