export interface WeatherRedisReq {
  city: string;
  temperature: number;
  humidity: number;
  pressure: number;
  description: string;
  icon: string;
  userId: string;
}
