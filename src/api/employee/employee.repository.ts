import { EntityRepository, Repository } from 'typeorm';
import { Employee } from '../../database/entities/Employee';

@EntityRepository(Employee)
class EmployeeRepository extends Repository<Employee> {}

export { EmployeeRepository };
