import { EntityRepository, Repository } from 'typeorm';
import { User } from '../../database/entity/User';

@EntityRepository(User)
class UsersRepositories extends Repository<User> {}

export { UsersRepositories };
