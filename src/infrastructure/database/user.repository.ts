import { prisma } from './prisma-client';
import { User } from '../../domain/user/entities/user.entity';
import { IUserRepository } from '../../domain/user/repositories/user-repository.interface';
import { BaseRepository } from './base.repository';

export class UserRepository
  extends BaseRepository<User>
  implements IUserRepository
{
  constructor() {
    super(prisma, 'user');
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }
}
