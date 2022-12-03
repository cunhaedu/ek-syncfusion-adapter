import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '@config/auth';
import { AppError } from '@shared/errors/AppError';

export default (req: Request, res: Response, next: NextFunction): void => {
  const authConfig = auth();

  const authHeader = req.headers.authorization;

  if (!authHeader)
    throw new AppError(
      `JWT token is missing from host: ${req.ip} (${req.hostname})`,
    );

  const [, token] = authHeader.split(' ');

  try {
    verify(token, authConfig.SECRET);
    return next();
  } catch {
    throw new AppError(
      `Invalid JWT token from host: ${req.ip} (${req.hostname})`,
    );
  }
};
