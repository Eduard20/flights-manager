describe('syncDatabase scripts', () => {
  it('should run without exceptions', async () => {
    const authenticate = jest.fn();
    const sync = jest.fn();
    const close = jest.fn();

    jest.doMock('models', () => ({}));
    jest.doMock('utils/database', () => ({
      databaseService: {
        authenticate,
        sync,
        close,
      },
    }));

    jest.isolateModules(async () => {
      await import('./syncDatabase');

      expect(authenticate).toBeCalled();
      expect(sync).toBeCalled();
    });
  });
});
