import { prisma } from './prisma-client';
import { WeatherQuery } from '../../domain/entities/weather-query.entity';
import { IWeatherQueryRepository } from '../../domain/repositories/weather-query-repository.interface';
import { BaseRepository } from './base.repository';

export class WeatherQueryRepository
  extends BaseRepository<WeatherQuery>
  implements IWeatherQueryRepository
{
  constructor() {
    super(prisma, 'weatherQuery' as keyof typeof prisma);
  }

  async create(query: WeatherQuery): Promise<WeatherQuery> {
    return prisma.weatherQuery.create({ data: query });
  }

  async getAll(): Promise<WeatherQuery[]> {
    return prisma.weatherQuery.findMany();
  }

  async getByUserId(userId: string): Promise<WeatherQuery[]> {
    return prisma.weatherQuery.findMany({ where: { userId } });
  }
}
