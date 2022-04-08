import { Router } from 'express';
import { EmployeeController } from '../api/controllers/employee/employee.controller';
import { UserController } from '../api/controllers/user/user.controller';
import { VacationController } from '../api/controllers/vacations/vacation.controller';
import { ensureAuth } from '../api/middlewares/ensureAuth';

const router = Router();

const userController = new UserController();
const employeeController = new EmployeeController();
const vacationController = new VacationController();

router.post('/login', userController.login);
router.post('/createUser', ensureAuth, userController.createUser);

router.post('/createEmployee', ensureAuth, employeeController.createEmployee);

router.post('/createVacation', ensureAuth, vacationController.createVacation);
router.get('/vacation', ensureAuth, vacationController.listPendingVacations);
router.get('/listAllVacations', ensureAuth, vacationController.listVacations);

router.post('/approveVacations', ensureAuth, vacationController.approveVacations);

export { router };
