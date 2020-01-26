import httpMocks from 'node-mocks-http';
import config from 'config/environment/service';
import {
  createSuccessResponse,
  createErrorResponse,
  createFailResponse,
  formatRes,
  createSuccessListResponse
} from './responseCreator';

describe('responseCreator', () => {
  let req: httpMocks.MockRequest<any>;
  let res: httpMocks.MockResponse<any>;
  let originalEnv: string;

  beforeEach(() => {
    req = httpMocks.createRequest();
    req.log = {
      error: jest.fn(),
    };

    res = httpMocks.createResponse();
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();

    originalEnv = config.env;
    config.env = 'production';
  });

  afterEach(() => {
    config.env = originalEnv;
  });

  describe('formatRes helper', () => {
    it('should format data to object with "body" and "header" prop', () => {
      const data = {
        hello: 'world',
      };

      const header = {
        status: "success",
        message: "success",
      };

      const resp = formatRes(data, header);

      expect(resp).toEqual({
        body: data,
        header,
      });
    });

    it('should format "undefined" to empty object', () => {
      const resp = formatRes(undefined, undefined);

      expect(resp).toEqual({
        body: {},
        header: {}
      });
    });
  });

  describe('createSuccessResponse method', () => {
    it('should return success response with json data and status code', () => {
      const data = { data: 'test' };
      const status = 201;

      createSuccessResponse(res, status, data);

      expect(res.status).toHaveBeenCalledWith(status);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        data,
      });
    });

    it('should return success response with empty data and 200 status code by default', () => {
      const data = {};
      const status = 200;

      createSuccessResponse(res);

      expect(res.status).toHaveBeenCalledWith(status);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        data,
      });
    });
  });

  describe('createFailResponse method', () => {
    it('should return error response with message, data and status code when in production env', () => {
      const message = 'test message';
      const status = 501;
      const data = { hey: 'test' };

      createFailResponse(req, res, status, message, data);

      expect(res.status).toHaveBeenCalledWith(status);
      expect(res.json).toHaveBeenCalledWith(formatRes({
        data,
      }, {
        status: 'fail',
        message,
      }));
    });

    it('should return error response with empty error, standard message, data and 400 status code by default', () => {
      const message = 'Bad Request';
      const error = {};
      const status = 400;
      const data = {};

      config.env = 'development';

      createFailResponse(req, res);

      expect(res.status).toHaveBeenCalledWith(status);
      expect(res.json).toHaveBeenCalledWith(formatRes({
        data,
        error,
      }, {
        status: 'fail',
        message,
      }));
    });

    it('should use formatRes inside', async () => {
      const message = 'test message';
      const status = 501;
      const data = { hey: 'test' };
      const resp = {body: {}, header: {}};

      const responseCreator = await import('./responseCreator');
      const spy = jest.spyOn(responseCreator, 'formatRes');
      spy.mockImplementation(() => resp);
      responseCreator.createFailResponse(req, res, status, message, data);

      expect(res.status).toHaveBeenCalledWith(status);
      expect(spy.mock.calls.length).toBe(1);
      expect(res.json).toHaveBeenCalledWith(resp);

      spy.mockRestore();
    });
  });

  describe('createErrorResponse method', () => {
    it('should return error response with message and status code when in production env', () => {
      const message = 'test message';
      const status = 501;

      createErrorResponse(req, res, status, message);

      expect(res.status).toHaveBeenCalledWith(status);
      expect(res.json).toHaveBeenCalledWith(formatRes(undefined, {
        status: 'error',
        message,
      }));
    });

    it('should return error response with empty error, standard message and 500 status code by default', () => {
      const message = 'Internal Server Error';
      const error = {};
      const status = 500;

      config.env = 'development';

      createErrorResponse(req, res);

      expect(res.status).toHaveBeenCalledWith(status);
      expect(res.json).toHaveBeenCalledWith(formatRes({
        error,
      }, {
        status: 'error',
        message,
      }));
    });

    it('should use formatRes inside', async () => {
      const status = 500;
      const resp = {body: {}, header: {}};

      const responseCreator = await import('./responseCreator');
      const spy = jest.spyOn(responseCreator, 'formatRes');
      spy.mockImplementation(() => resp);

      responseCreator.createErrorResponse(req, res);

      expect(res.status).toHaveBeenCalledWith(status);
      expect(spy.mock.calls.length).toBe(1);
      expect(res.json).toHaveBeenCalledWith(resp);

      spy.mockRestore();
    });
  });

  describe('createSuccessListResponse method', () => {
    it('should return "List response"', () => {
      const data = ['test message'];

      createSuccessListResponse(res, 200, { List: data });

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        List: data
      });
    });

    it('should return "List response"', () => {
      createSuccessListResponse(res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        List: []
      });
    });
  });
});
