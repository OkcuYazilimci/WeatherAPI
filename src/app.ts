import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './presentation/routes/auth.routes';
import { errorHandler } from './presentation/middleware/error-handler.middleware';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.use(errorHandler);

export default app; // ✅ Export ediyoruz ki server.ts kullanabilsin
