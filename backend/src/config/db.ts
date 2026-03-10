import { Pool } from 'pg';
import { loadEnv } from './env';

const env = loadEnv();

if (!env.DATABASE_URL) {
  // eslint-disable-next-line no-console
  console.warn('DATABASE_URL is not set. Database connection will fail until it is configured.');
}

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

export const query = (text: string, params?: unknown[]) => pool.query(text, params);
