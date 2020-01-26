import { Request, Response } from 'express';
import { createFailResponse } from 'utils/response';
import { messages } from 'constants/messages';

export function notFoundController(req: Request, res: Response) {
  return createFailResponse(req, res, 404, messages.fail.notFound);
}
