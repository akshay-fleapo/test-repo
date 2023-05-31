import { Response } from 'express';

interface ApiResponse<T> {
  success: boolean;
  message?: string | null;
  data?: T | null;
  error?: Error | null;
}

export const respond = <T>(
  res: Response,
  success: boolean,
  data?: T | null,
  message?: string | null,
  error?: Error | null,
  statusCode?: number
): Response => {
  const apiResponse: ApiResponse<T> = {
    success,
    message: (message as string) ?? 'ok',
    data: data ? data : null,
    error: error ? error : null
  };

  return res.status(success ? statusCode || 200 : statusCode ?? 500).json(apiResponse);
};
