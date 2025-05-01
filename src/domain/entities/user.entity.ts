import { UserRole } from '../../shared/enums/user-role.enum';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}