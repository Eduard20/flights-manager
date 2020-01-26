import { Request, Response, NextFunction } from 'express';
import * as expressValidation from 'express-validation';

import { createFailResponse } from 'utils/response';
import { messages } from 'constants/messages';

export function validationError(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof expressValidation.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    const errorMessage = err.errors
      .map((error: any) =>
        error.messages.reduce((acc: string, message: string) => `${message} in ${error.location}. ${acc}`, ''),
      )
      .join('');
    return createFailResponse(req, res, 400, messages.fail.badRequest, { errorMessage }, err);
  } else {
    next(err);
  }
}
