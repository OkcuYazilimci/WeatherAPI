import { Request, Response, NextFunction } from 'express';
import { WeatherService } from '../../application/weather/weather.service';
import { WeatherQueryRepository } from '../../infrastructure/database/weather-query.repository';

const weatherService = new WeatherService(new WeatherQueryRepository());

export const getWeatherByCity = async (req: Request, res: Response, next: NextFunction) => {
  const { city } = req.query;
  const userId = req.user.id;

  if (!city || typeof city !== 'string') {
    res.status(400).json({ message: 'City is required' });
    return;
  }

  try {
    const result = await weatherService.getWeatherByCity(city, userId);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await weatherService.getAllQueries();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const getUserWeatherQueries = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.id;
    const result = await weatherService.getUserQueries(userId);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
