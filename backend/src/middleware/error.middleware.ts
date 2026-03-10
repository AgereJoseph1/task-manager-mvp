import { Request, Response, NextFunction } from 'express';

interface ApiError extends Error {
  statusCode?: number;
  code?: string;
}

export const errorHandler = (
  err: ApiError,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  const statusCode = err.statusCode || 500;
  const code = err.code || 'INTERNAL_SERVER_ERROR';

  if (statusCode >= 500) {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  res.status(statusCode).json({
    error: {
      message: err.message || 'Something went wrong',
      code,
    },
  });
};
