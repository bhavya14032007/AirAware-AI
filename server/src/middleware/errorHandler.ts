import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

/**
 * Centralized Application Error Handler
 * Enforces secure error masking in production to prevent stack trace leaks.
 */
export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  if (process.env.NODE_ENV !== 'test') {
    console.error('[Error Handler]', err);
  }

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'Validation failed',
      details: err.errors.map(e => ({ path: e.path.join('.'), message: e.message }))
    });
  }

  const isObj = err !== null && typeof err === 'object';
  const status = isObj && 'status' in err && typeof (err as { status: unknown }).status === 'number'
    ? (err as { status: number }).status
    : isObj && 'statusCode' in err && typeof (err as { statusCode: unknown }).statusCode === 'number'
    ? (err as { statusCode: number }).statusCode
    : 500;

  const isProduction = process.env.NODE_ENV === 'production';
  const message = err instanceof Error
    ? (isProduction && status === 500 ? 'Internal server error' : err.message)
    : 'Internal server error';

  res.status(status).json({
    error: message,
    status
  });
}
