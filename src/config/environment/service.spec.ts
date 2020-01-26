import 'config/environment/variables';

describe('serviceEnvironment', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should export object with correct keys', () => {
    const serviceConfig = require('./service').default;

    expect(serviceConfig).toMatchObject({
      projectName: expect.any(String),
      env: expect.any(String),
      log: {
        level: expect.any(String),
        directory: expect.any(String),
        types: expect.arrayContaining([expect.any(String)]),
      },
      port: expect.any(Number),
      baseApiUrl: expect.any(String),
    });
  });

  it('should throw when there is a validation error', () => {
    jest.doMock('config/environment/variables', () => ({
      notValidKey: 'notValidKey',
    }));

    expect(() => {
      require('config/environment/service');
    }).toThrowError();
  });

  it('should provide log optin "MSSQL_LOGGING" to be able debug DB', () => {
    jest.doMock('config/environment/variables', () => ({
      MSSQL_LOGGING: true,
      PROJECT_NAME: 'project',
      NODE_ENV: 'production',
      NODE_TLS_REJECT_UNAUTHORIZED: 1,
      PORT: 3000,
      SWAGGER_PORT: 3001,
      BASE_API_URL: 'asd',
    }));

    const serviceConfig = require('./service').default;

    expect(serviceConfig).toMatchObject({
      database: {
        logging: expect.any(Function),
      },
    });
  });
});
