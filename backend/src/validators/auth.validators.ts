import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Email must be a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(100, 'Password must be at most 100 characters long'),
});

export const loginSchema = z.object({
  email: z.string().email('Email must be a valid email address'),
  password: z.string().min(1, 'Password is required'),
});
