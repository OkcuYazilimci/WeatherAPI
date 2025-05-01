export interface WeatherQuery {
  id: string;
  city: string;
  temperature: number;
  humidity: number;
  pressure: number;
  description: string;
  icon: string;
  userId: string;
  createdAt: Date;
}
