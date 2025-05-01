import { prisma } from './prisma-client';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user-repository.interface';
import { BaseRepository } from './base.repository';
import { UserRole } from '../../shared/enums/user-role.enum';

export class UserRepository
  extends BaseRepository<User>
  implements IUserRepository
{
  constructor() {
    super(prisma, 'user');
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await prisma.user.findUnique({ where: { email } });
    if (!result) return null;
  
    return {
      ...result,
      role: result.role as UserRole
    };
  }
}
