import jwt from 'jsonwebtoken';
import { loadEnv } from '../config/env';

const env = loadEnv();

export interface JwtPayload {
  userId: string;
  email: string;
}

export const signToken = (payload: JwtPayload): string => {
  if (!env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured');
  }

  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token: string): JwtPayload => {
  if (!env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured');
  }

  return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
};
