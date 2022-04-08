import { Router } from 'express';
import { EmployeeController } from '../api/employee/employee.controller';
import { ensureAuth } from '../api/middlewares/ensureAuth';
import { UserController } from '../api/user/user.controller';

const router = Router();

const userController = new UserController();
const employeeController = new EmployeeController();

router.post('/login', userController.authUser);
router.post('/createUser', ensureAuth, userController.createUser);

router.post('/createEmployee', employeeController.createEmployee);

export { router };
