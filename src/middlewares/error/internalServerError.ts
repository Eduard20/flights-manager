import { Request, Response, NextFunction } from 'express';
import { createErrorResponse } from 'utils/response';
import { messages } from 'constants/messages';

export function internalServerError(err: any, req: Request, res: Response, next: NextFunction) {
  return createErrorResponse(req, res, 500, messages.error.internalServerError, err);
}
