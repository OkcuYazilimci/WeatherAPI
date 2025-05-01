import { UserRepository } from '../../infrastructure/database/user.repository';
import { generateToken } from '../../shared/utils/jwt.util';
import { RegisterReq } from '../../shared/dto/auth/register.req';
import { LoginReq } from '../../shared/dto/auth/login.req';
import { User } from '../../domain/user/entities/user.entity';
import { AppError } from '../../shared/errors/app-error';
import bcrypt from 'bcrypt';

export class AuthService {
  private userRepository = new UserRepository();

  async register(data: RegisterReq): Promise<{ user: User; token: string }> {
    const existing = await this.userRepository.findByEmail(data.email);
    if (existing) throw new AppError('Email already in use', 409);

    const hashedPassword = await bcrypt.hash(data.password, 12);

    const user = await this.userRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role
    });

    const token = generateToken({ id: user.id, role: user.role });
    return { user, token };
  }

  async login(data: LoginReq): Promise<{ user: User; token: string }> {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) throw new AppError('Email or password is invalid', 401);

    const isValid = await bcrypt.compare(data.password, user.password);
    if (!isValid || !user) throw new AppError('Email or password is invalid', 401);

    const token = generateToken({ id: user.id, role: user.role });
    return { user, token };
  }
}
