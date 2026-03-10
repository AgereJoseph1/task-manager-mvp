import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title is too long'),
  description: z.string().max(5000, 'Description is too long').optional(),
  status: z.enum(['todo', 'in_progress', 'done']).optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  due_date: z.string().date().optional().or(z.literal('').transform(() => undefined)),
});

export const updateTaskSchema = createTaskSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  {
    message: 'At least one field must be provided to update',
  },
);

export const listTasksQuerySchema = z.object({
  status: z.enum(['todo', 'in_progress', 'done']).optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  search: z.string().optional(),
  sortBy: z.enum(['due_date', 'created_at']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : undefined))
    .refine((val) => (val === undefined ? true : Number.isInteger(val) && val > 0), {
      message: 'page must be a positive integer',
    }),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : undefined))
    .refine((val) => (val === undefined ? true : Number.isInteger(val) && val > 0 && val <= 100), {
      message: 'limit must be a positive integer up to 100',
    }),
});
