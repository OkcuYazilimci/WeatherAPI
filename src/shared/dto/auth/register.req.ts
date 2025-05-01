import { UserRole } from '../../enums/user-role.enum';

export interface RegisterReq {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}
