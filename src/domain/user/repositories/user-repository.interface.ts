import { User } from '../entities/user.entity';
import { IBaseRepository } from '../../../shared/interfaces/base-repository.interface';

export interface IUserRepository extends IBaseRepository<User> {
  findByEmail(email: string): Promise<User | null>;
}
