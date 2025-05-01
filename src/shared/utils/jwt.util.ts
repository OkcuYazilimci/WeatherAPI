import jwt, { SignOptions } from 'jsonwebtoken';

export function generateToken(
payload: object,
options?: Partial<SignOptions>): string {
  const signOptions: SignOptions = {
    expiresIn: '1d',
    issuer: process.env.JWT_ISSUER || 'weather-api',
    audience: process.env.JWT_AUDIENCE || 'weather-client',
    ...options
  };

  return jwt.sign(payload, process.env.JWT_SECRET!, signOptions);
}

export function verifyToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET!, {
    issuer: process.env.JWT_ISSUER,
    audience: process.env.JWT_AUDIENCE,
  });
}    