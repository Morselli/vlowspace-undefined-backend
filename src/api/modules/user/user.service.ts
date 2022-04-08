import { getCustomRepository } from 'typeorm';
import { compare, hash } from 'bcryptjs';

import { UsersRepositories } from './user.repositoy';
import { User } from '../../../database/entities/User';
import { IUserDto, IRequest, IResponse } from './user.dto';
import { sign } from 'jsonwebtoken';
import { EmployeeRepository } from '../employee/employee.repository';

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

  async login({ email, password }: IRequest) {
    const usersRepository = getCustomRepository(UsersRepositories);
    const employeeRepository = getCustomRepository(EmployeeRepository);

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

    const employee = await employeeRepository.findOne({
      where: { userId: user.id },
      relations: ['user'],
    });

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('User/Password is incorrect');
    }

    const token = sign({}, process.env.JWT_SECRET, {
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
      employee: {
        id: employee.id,
        emailCorp: employee.emailCorp,
        ownerId: employee.ownerId,
        dpId: employee.dpId,
      },
    };

    return returnToken;
  }
}

export { UserService };
