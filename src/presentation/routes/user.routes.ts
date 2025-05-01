import { Router } from 'express';
import {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
  getMyStatus
} from '../../presentation/controllers/user.controller';
import { authorize } from '../../presentation/middleware/auth.middleware';
import { UserRole } from '../../shared/enums/user-role.enum';

const router = Router();

router.get('/', authorize([UserRole.ADMIN]), getAllUsers);
router.post('/', authorize([UserRole.ADMIN]), addUser);
router.put('/:id', authorize([UserRole.ADMIN]), updateUser);
router.delete('/:id', authorize([UserRole.ADMIN]), deleteUser);
router.get('/me', authorize([UserRole.USER, UserRole.ADMIN]), getMyStatus); // Me tüm roller için

export default router;
