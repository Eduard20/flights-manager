import { methods } from 'constants/constants';
import { handleOptionsRequest } from './handleOptionsRequest';

describe('handleOptionsRequest middleware', () => {
  describe(`middleware should not rise exceptions`, () => {
    it('should change "headers" on "OPTIONS" request', async () => {
      const header = jest.fn();
      const end = jest.fn();
      const next: any = jest.fn();

      const req: any = { method: methods.options };
      const res: any = { header, end };

      handleOptionsRequest(req, res, next);

      expect(header.mock.calls.length).toBe(7);
      expect(end.mock.calls.length).toBe(1);
      expect(next.mock.calls.length).toBe(0);
    });

    it('should change "headers" on "POST" request', async () => {
      const header = jest.fn();
      const end = jest.fn();
      const next: any = jest.fn();

      const req: any = { method: 'BOOO' };
      const res: any = { header, end };

      handleOptionsRequest(req, res, next);

      expect(header.mock.calls.length).toBe(0);
      expect(end.mock.calls.length).toBe(0);
      expect(next.mock.calls.length).toBe(1);
    });
  });
});
