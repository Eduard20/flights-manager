import httpMocks from 'node-mocks-http';
import { validationError } from './index';
import { NextFunction } from 'express';
import { createFailResponse } from 'utils/response';
import { ValidationError } from 'express-validation';

jest.mock('utils/response');

describe('validationError', () => {
  let req: httpMocks.MockRequest<any>;
  let res: httpMocks.MockResponse<any>;
  let nextFn: NextFunction;

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    nextFn = jest.fn();
  });

  it(`should call createFailResponse() with 400 status code and error when there is a validation error`, () => {
    const error = new ValidationError(
      [
        {
          messages: ['some error'],
          location: 'test',
        },
      ],
      {},
    );
    const expectedMessage = 'some error in test. ';
    const errorMessage = 'Bad Request';

    validationError(error, req, res, nextFn);

    expect(createFailResponse).toHaveBeenCalledWith(
      req,
      res,
      400,
      errorMessage,
      { errorMessage: expectedMessage },
      error,
    );
  });

  it('should call next() with error when error is not instance of ValidationError', () => {
    const error = 'test error';

    validationError(error, req, res, nextFn);

    expect(nextFn).toHaveBeenCalledWith(error);
  });
});
