import axios from 'axios';
import Redis from 'ioredis';

import { AppError } from '../../shared/errors/app-error';
import { WeatherQueryRes } from '../../shared/dto/weather/weather-query.res';
import { IWeatherQueryRepository } from '../../domain/repositories/weather-query-repository.interface';
import { WeatherRedisReq } from '../../shared/dto/weather/weather-redis.req';

export class WeatherService {
  private readonly redis = new Redis();
  private readonly geoUrl = 'http://api.openweathermap.org/geo/1.0/direct';  // Geolocation API
  private readonly weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';  // Current Weather API
  private readonly apiKey = process.env.OPENWEATHER_API_KEY!;

  constructor(private readonly weatherQueryRepo: IWeatherQueryRepository) {}

  async getWeatherByCity(city: string, userId: string): Promise<WeatherQueryRes> {
    const cacheKey = `weather:${city.toLowerCase()}:${userId}`;
    const cached = await this.redis.get(cacheKey);
    
    // Eğer Redis'te veri varsa
    if (cached) {
      const parsedCached = JSON.parse(cached);
      // userId'yi veriden çıkarıyoruz
      const { userId, ...result } = parsedCached;
      return result; // userId'siz veriyi döndürüyoruz
    }
  
    // Eğer şehir bazlı veriyi Redis'te bulursak
    const cityCacheKey = `weather:${city.toLowerCase()}`;
    const cityCached = await this.redis.get(cityCacheKey);
  
    if (cityCached) {
      const cityData = JSON.parse(cityCached);
      
      // City verisini userId ile birlikte veritabanına kaydediyoruz
      await this.weatherQueryRepo.create({
        city: cityData.city,
        userId,
        temperature: cityData.temperature,
        humidity: cityData.humidity,
        pressure: cityData.pressure,
        description: cityData.description,
        icon: cityData.icon,
      });
  
      // Veriyi Redis'e kaydediyoruz, ancak sadece city verisi ile kaydediyoruz
      await this.redis.set(cacheKey, JSON.stringify({ ...cityData, userId }), 'EX', 3600);
  
      return cityData; // userId'yi yine burada döndürmüyoruz
    }
  
    // Redis'te veri yoksa, API'ye istek yapıyoruz
    const geoRes = await axios.get(this.geoUrl, {
      params: {
        q: city,
        limit: 1,
        appid: this.apiKey,
      },
    });
  
    if (!geoRes.data || geoRes.data.length === 0) {
      throw new AppError('City not found', 404);
    }
  
    const { lat, lon, name } = geoRes.data[0];
  
    const weatherRes = await axios.get(this.weatherUrl, {
      params: {
        lat,
        lon,
        units: 'metric',
        appid: this.apiKey,
      },
    });
  
    const result: WeatherQueryRes = {
      city: name,
      temperature: weatherRes.data.main.temp,
      humidity: weatherRes.data.main.humidity,
      pressure: weatherRes.data.main.pressure,
      description: weatherRes.data.weather[0].description,
      icon: weatherRes.data.weather[0].icon
    };
  
    // Şehir bazlı veriyi Redis'e kaydediyoruz
    await this.redis.set(cityCacheKey, JSON.stringify(result), 'EX', 3600);
  
    // Kullanıcı bazlı veriyi Redis'e kaydediyoruz
    const userCacheData = { ...result, userId };
    await this.redis.set(cacheKey, JSON.stringify(userCacheData), 'EX', 3600);
  
    // Veriyi veritabanına kaydediyoruz
    await this.weatherQueryRepo.create({
      city: result.city,
      userId,
      temperature: result.temperature,
      humidity: result.humidity,
      pressure: result.pressure,
      description: result.description,
      icon: result.icon
    });
  
    return result;
  }
  

  async getAllQueries() {
    return this.weatherQueryRepo.getAll();
  }

  async getUserQueries(userId: string) {
    return this.weatherQueryRepo.getByUserId(userId);
  }
}
