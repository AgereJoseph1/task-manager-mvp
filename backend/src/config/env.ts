import dotenv from 'dotenv';

export interface Env {
  NODE_ENV: 'development' | 'test' | 'production';
  PORT: number;
  DATABASE_URL: string;
  JWT_SECRET: string;
  CORS_ORIGIN: string;
}

let cachedEnv: Env | null = null;

export const loadEnv = (): Env => {
  if (cachedEnv) return cachedEnv;

  dotenv.config();

  const {
    NODE_ENV = 'development',
    PORT = '4000',
    DATABASE_URL = '',
    JWT_SECRET = '',
    CORS_ORIGIN = 'http://localhost:5173',
  } = process.env;

  if (!DATABASE_URL) {
    // eslint-disable-next-line no-console
    console.warn('DATABASE_URL is not set. Database operations will fail until it is configured.');
  }

  if (!JWT_SECRET) {
    // eslint-disable-next-line no-console
    console.warn('JWT_SECRET is not set. JWT operations will fail until it is configured.');
  }

  cachedEnv = {
    NODE_ENV: NODE_ENV as Env['NODE_ENV'],
    PORT: Number(PORT) || 4000,
    DATABASE_URL,
    JWT_SECRET,
    CORS_ORIGIN,
  };

  return cachedEnv;
};
