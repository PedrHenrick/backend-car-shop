import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { errorCatalog, ErrorTypes } from '../class/error.class';

const errorHandle: ErrorRequestHandler = (
  error: Error | ZodError,
  _request: Request,
  response: Response,
  _next: NextFunction,
) => {
  if (error instanceof ZodError) {
    return response.status(400).json({ message: error.issues });
  }

  const messageAsErrorType = error.message as keyof typeof ErrorTypes;
  const mappedError = errorCatalog[messageAsErrorType];

  if (mappedError) {
    const { status, message } = mappedError;
    return response.status(status).json({ error: message });
  }

  console.log(error);
  return response.status(500).json({ error: 'Internal Error' });
};

export default errorHandle;