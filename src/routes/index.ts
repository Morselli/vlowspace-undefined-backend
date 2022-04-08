import { Router } from 'express';
import { EmployeeController } from '../api/modules/employee/employee.controller';
import { UserController } from '../api/modules/user/user.controller';
import { VacationController } from '../api/modules/vacations/vacation.controller';
import { ensureAuth } from '../api/middlewares/ensureAuth';

const router = Router();

const userController = new UserController();
const employeeController = new EmployeeController();
const vacationController = new VacationController();

router.post('/login', userController.login);
router.post('/createUser', ensureAuth, userController.createUser);

router.post('/createEmployee', employeeController.createEmployee);

router.post('/createVacation/:dpId/:ownerId', vacationController.createVacation);
export { router };
