import { Request, Response } from 'express';

import { UserService } from './user.service';

class UserController {
  async createUser(request: Request, response: Response): Promise<Response> {
    const userService = new UserService();

    const { email, name, password, role } = request.body;

    try {
      const user = await userService.createUser({
        email,
        name,
        password,
        role,
      });

      return response.json(user);
    } catch (error) {
      return response.json({ error: error.message });
    }
  }

  async login(request: Request, response: Response): Promise<Response> {
    const userService = new UserService();

    const { email, password } = request.body;

    try {
      const token = await userService.login({
        email,
        password,
      });

      return response.json(token);
    } catch (error) {
      return response.json({ error: error.message });
    }
  }
}

export { UserController };
