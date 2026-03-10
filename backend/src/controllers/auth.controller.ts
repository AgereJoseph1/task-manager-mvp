import { Request, Response, NextFunction } from 'express';
import { registerUser, loginUser, getCurrentUser } from '../services/auth.service';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import { NotFoundError } from '../utils/errors';

export const registerHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    const result = await registerUser(email, password);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export const loginHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    const result = await loginUser(email, password);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const meHandler = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new NotFoundError('User not found');
    }

    const user = await getCurrentUser(req.user.id);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
