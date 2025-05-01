import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRole } from '../../shared/enums/user-role.enum';
import { AppError } from '../../shared/errors/app-error';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return next(new AppError('Unauthorized: No token provided', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      role: UserRole;
    };

    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    return next(new AppError('Unauthorized: Invalid token', 401));
  }
};

export const authorize = (roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {

    if (!roles.includes(req.user.role)) {
      return next(new AppError('Forbidden: Access denied', 403));
    }

    next();
  };
};
