import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import { UsersRepositories } from './user.repositoy';
import { User } from '../../database/entity/User';
import { IUserDto } from './user.dto';

class UserService {
  async createUser({ email, name, password, role }: IUserDto): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepositories);
    if (!email) {
      throw new Error('Email is required');
    }

    const userExist = await usersRepository.findOne({
      email,
    });

    if (userExist) {
      throw new Error('User already exist');
    }

    const hashedPassword = await hash(password, 12);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await usersRepository.save(user);

    return user;
  }
}

export { UserService };
