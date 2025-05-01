import { IBaseRepository } from '../../shared/interfaces/base-repository.interface';
import { WeatherQuery } from '../entities/weather-query.entity';

export interface IWeatherQueryRepository extends IBaseRepository<WeatherQuery> {
  getByUserId(userId: string): Promise<WeatherQuery[]>;
}
