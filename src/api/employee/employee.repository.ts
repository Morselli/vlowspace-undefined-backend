import { EntityRepository, Repository } from 'typeorm';
import { Employee } from '../../database/entity/Employee';

@EntityRepository(Employee)
class EmployeeRepository extends Repository<Employee> {}

export { EmployeeRepository };
