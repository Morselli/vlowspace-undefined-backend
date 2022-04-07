import { Router } from 'express';
import { UserController } from '../api/user/user.controller';

const router = Router();

const userController = new UserController();

router.post('/createUser', userController.createUser);

export { router };
