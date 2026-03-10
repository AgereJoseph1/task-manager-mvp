import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { ValidationError } from '../utils/errors';

export const validateBody = (schema: AnyZodObject) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const message = err.errors.map((e) => e.message).join(', ');
        next(new ValidationError(message));
      } else {
        next(err);
      }
    }
  };
};

export const validateQuery = (schema: AnyZodObject) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.query = schema.parse(req.query);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const message = err.errors.map((e) => e.message).join(', ');
        next(new ValidationError(message));
      } else {
        next(err);
      }
    }
  };
};
