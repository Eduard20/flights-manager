import httpMocks from 'node-mocks-http';
import { internalServerError } from './index';
import { NextFunction } from 'express';
import { createErrorResponse } from 'utils/response';

jest.mock('utils/response');

describe('internalServerError', () => {
  let req: httpMocks.MockRequest<any>;
  let res: httpMocks.MockResponse<any>;
  let nextFn: NextFunction;

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    nextFn = jest.fn();
  });

  it(`should call createErrorResponse() with 500 status code and error`, () => {
    const error = 'test error';

    internalServerError(error, req, res, nextFn);

    expect(createErrorResponse).toHaveBeenCalledWith(req, res, 500, 'Internal Server Error', error);
  });
});
