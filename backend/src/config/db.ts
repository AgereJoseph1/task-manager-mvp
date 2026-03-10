import { Pool } from 'pg';
import { loadEnv } from './env';

const env = loadEnv();

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

export const query = (text: string, params?: unknown[]) => pool.query(text, params);
