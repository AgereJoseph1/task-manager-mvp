import { createUser, findUserByEmail, findUserById, User } from '../models/user.model';
import { hashPassword, comparePassword } from '../utils/password';
import { signToken } from '../utils/jwt';
import { AuthError, ValidationError } from '../utils/errors';

export interface AuthResult {
  user: Pick<User, 'id' | 'email'>;
  token: string;
}

export const registerUser = async (email: string, password: string): Promise<AuthResult> => {
  const existing = await findUserByEmail(email);
  if (existing) {
    throw new ValidationError('Email is already in use');
  }

  const passwordHash = await hashPassword(password);
  const user = await createUser(email, passwordHash);

  const token = signToken({ userId: user.id, email: user.email });

  return {
    user: { id: user.id, email: user.email },
    token,
  };
};

export const loginUser = async (email: string, password: string): Promise<AuthResult> => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new AuthError('Invalid email or password');
  }

  const isValid = await comparePassword(password, user.password_hash);
  if (!isValid) {
    throw new AuthError('Invalid email or password');
  }

  const token = signToken({ userId: user.id, email: user.email });

  return {
    user: { id: user.id, email: user.email },
    token,
  };
};

export const getCurrentUser = async (userId: string): Promise<Pick<User, 'id' | 'email'> | null> => {
  const user = await findUserById(userId);
  if (!user) return null;
  return { id: user.id, email: user.email };
};
