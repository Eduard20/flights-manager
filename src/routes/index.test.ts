import request, { SuperTest, Test } from 'supertest';

import app from 'app';

describe('General API Routes', () => {
  let server: SuperTest<Test>;

  beforeAll(() => {
    server = request(app);
  });

  describe('GET /does/not/exist', () => {
    test('should throw an error', async () => {
      const response = await server.get('/does/not/exist');

      expect(response.status).toBe(404);
      expect(response.type).toBe('application/json');
      if (response.body.header) {
        expect(response.body.header).toHaveProperty('status', 'fail');
        expect(response.body.header).toHaveProperty('message', 'Not Found');
      } else {
        expect(response.body).toHaveProperty('status', 'fail');
        expect(response.body).toHaveProperty('message', 'Not Found');
      }
    });
  });
});
