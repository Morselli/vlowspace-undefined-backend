import { getCustomRepository } from 'typeorm';
import { compare, hash } from 'bcryptjs';

import { UsersRepositories } from './user.repositoy';
import { User } from '../../database/entities/User';
import { IUserDto, IRequest, IResponse } from './user.dto';
import { sign } from 'jsonwebtoken';

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

  async authUser({ email, password }: IRequest) {
    const usersRepository = getCustomRepository(UsersRepositories);

    const user = await usersRepository.findOne(
      {
        email,
      },
      {
        select: ['id', 'name', 'email', 'role', 'password'],
      },
    );

    if (!user) {
      throw new Error('User not found');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('User/Password is incorrect');
    }

    const token = sign({}, 'efa15263cc615178c864f8449ab67c51', {
      subject: user.id,
      expiresIn: '1d',
    });

    const returnToken: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        id: user.id,
      },
    };

    return returnToken;
  }
}

export { UserService };
