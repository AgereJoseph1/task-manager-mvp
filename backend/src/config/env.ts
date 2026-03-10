import dotenv from 'dotenv';

export interface Env {
  NODE_ENV: 'development' | 'test' | 'production';
  PORT: number;
  DATABASE_URL?: string;
  JWT_SECRET: string;
  CORS_ORIGIN?: string;
}

let cachedEnv: Env | null = null;

export const loadEnv = (): Env => {
  if (cachedEnv) return cachedEnv;

  dotenv.config();

  const {
    NODE_ENV = 'development',
    PORT = '4000',
    DATABASE_URL,
    JWT_SECRET = 'change-me-in-production',
    CORS_ORIGIN,
  } = process.env;

  const env: Env = {
    NODE_ENV: NODE_ENV as Env['NODE_ENV'],
    PORT: Number(PORT),
    DATABASE_URL,
    JWT_SECRET,
    CORS_ORIGIN,
  };

  cachedEnv = env;
  return env;
};
