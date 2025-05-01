import { Router } from 'express';
import {
  getWeatherByCity,
  getAll,
  getUserWeatherQueries
  
} from '../../presentation/controllers/weather-query.controller';
import { authenticate, authorize } from '../../presentation/middleware/auth.middleware';
import { UserRole } from '../../shared/enums/user-role.enum';

const router = Router();

router.use(authenticate);
router.get('/getWeatherByCity', authorize([UserRole.USER, UserRole.ADMIN]), getWeatherByCity);
router.get('/getUserWeatherQueries', authorize([UserRole.USER, UserRole.ADMIN]), getUserWeatherQueries);

router.get('/getAll', authorize([UserRole.ADMIN]), getAll);

export default router;
