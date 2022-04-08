import { EntityRepository, Repository } from 'typeorm';
import { User } from '../../database/entities/User';

@EntityRepository(User)
class UsersRepositories extends Repository<User> {}

export { UsersRepositories };
