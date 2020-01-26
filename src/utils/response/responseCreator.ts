import express from 'express';

import config from 'config/environment/service';
import { status, env } from 'constants/constants';
import { messages } from 'constants/messages';

type CurrentTypeOrEmptyObject<T> = T extends object ? T : object;
type CurrentListTypeOrNever<T> = T extends {
  List: any[];
  Lookup?: {
    [key: string]: any[];
  };
}
  ? T
  : { List: any[] };

export const formatRes = <T, Y>(
  body = {} as CurrentTypeOrEmptyObject<T>,
  header = {} as CurrentTypeOrEmptyObject<Y>,
) => ({
  body,
  header,
});

export const createSuccessResponse = <T>(
  response: express.Response,
  code = 200,
  data = {} as CurrentTypeOrEmptyObject<T>,
) =>
  response.status(code).json({
    status: status.success,
    data,
  });

export const createSuccessListResponse = <T>(
  response: express.Response,
  code = 200,
  data = { List: [] as any[] } as CurrentListTypeOrNever<T>,
) => response.status(code).json(data);

export const createFailResponse = <T>(
  request: express.Request,
  response: express.Response,
  code = 400,
  message = messages.fail.badRequest,
  data = {} as CurrentTypeOrEmptyObject<T>,
  error = {} as Error | object,
) => {
  console.error(message, { err: error });

  const header = {
    status: status.fail,
    message,
  };

  const body = {
    data,
  } as {
    data: typeof data;
    error?: Error | object;
  };

  if (config.env === env.dev) {
    body.error = error;
  }

  response.status(code).json(formatRes(body, header));
};

export const createErrorResponse = (
  request: express.Request,
  response: express.Response,
  code = 500,
  message = messages.error.internalServerError,
  error = {} as Error | object,
) => {
  console.error(message, { err: error });

  const header = {
    status: status.error,
    message,
  };

  const body = config.env === env.dev ? { error } : undefined;

  response.status(code).json(formatRes(body, header));
};
