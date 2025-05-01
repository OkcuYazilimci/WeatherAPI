import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './presentation/routes/auth.routes';
import userRoutes from './presentation/routes/user.routes';
import weatherRoutes from './presentation/routes/weather-query.routes';
import { errorHandler } from './presentation/middleware/error-handler.middleware';


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/auth', authRoutes);

app.use(errorHandler);

export default app; // ✅ Export ediyoruz ki server.ts kullanabilsin
