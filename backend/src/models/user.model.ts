import { query } from '../config/db';

export interface User {
  id: string;
  email: string;
  password_hash: string;
  created_at: string;
  updated_at: string;
}

export const createUser = async (email: string, passwordHash: string): Promise<User> => {
  const result = await query(
    `INSERT INTO users (email, password_hash)
     VALUES ($1, $2)
     RETURNING id, email, password_hash, created_at, updated_at`,
    [email, passwordHash],
  );

  return result.rows[0];
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const result = await query(
    `SELECT id, email, password_hash, created_at, updated_at
     FROM users
     WHERE email = $1`,
    [email],
  );

  return result.rows[0] || null;
};

export const findUserById = async (id: string): Promise<User | null> => {
  const result = await query(
    `SELECT id, email, password_hash, created_at, updated_at
     FROM users
     WHERE id = $1`,
    [id],
  );

  return result.rows[0] || null;
};
