import { UserRepository } from '../../infrastructure/database/user.repository';
import { User } from '../../domain/entities/user.entity';
import { AppError } from '../../shared/errors/app-error';

export class UserService {
  private userRepository = new UserRepository();

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.getAll();
  }

  async addUser(data: Partial<User>): Promise<User> {
    const existing = await this.userRepository.findByEmail(data.email!);
    if (existing) throw new AppError('Email already exists', 409);

    return this.userRepository.create(data);
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    const existing = await this.userRepository.getById(id);
    if (!existing) throw new AppError('User not found', 404);

    return this.userRepository.update(id, data);
  }

  async deleteUser(id: string): Promise<void> {
    const existing = await this.userRepository.getById(id);
    if (!existing) throw new AppError('User not found', 404);

    await this.userRepository.delete(id);
  }

  async getMyStatus(userId: string): Promise<User> {
    const user = await this.userRepository.getById(userId);
    if (!user) throw new AppError('User not found', 404);

    return user;
  }
}
