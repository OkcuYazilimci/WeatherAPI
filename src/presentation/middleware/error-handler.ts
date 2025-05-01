import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../shared/errors/app-error';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  const isProd = process.env.NODE_ENV === 'production';

  let statusCode = 500;
  let message = 'Internal server error';

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else {
    console.error('[Unhandled Error]', err);
  }

  res.status(statusCode).json({
    error: message,
    ...(isProd ? {} : { stack: err.stack })
  });
}
