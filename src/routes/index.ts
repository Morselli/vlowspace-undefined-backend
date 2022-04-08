import { Router } from 'express';
import { EmployeeController } from '../api/controllers/employee/employee.controller';
import { UserController } from '../api/controllers/user/user.controller';
import { VacationController } from '../api/controllers/vacations/vacation.controller';
import { VacationRequestController } from '../api/controllers/vacations_requests/vacation_request.controller';

const router = Router();

const userController = new UserController();
const employeeController = new EmployeeController();
const vacationController = new VacationController();
const vacationRequestController = new VacationRequestController();

router.post('/login', userController.authUser);
router.post('/createUser', ensureAuth, userController.createUser);

router.post('/createEmployee', employeeController.createEmployee);

router.post('/createVacation', vacationController.createVacation);

router.post('/createVacationRequest/:vacationId', vacationRequestController.createVacationRequest);

export { router };
