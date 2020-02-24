import { init } from '../../../index';

let server;
beforeAll(async (done) => {
  server = await init();
  done();
},30000);

afterAll(async (done) => {
  if (server && server.stop)
    await server.stop({ timeout: 0 });
  done();
},30000);
describe('test Module Auth', () => {

  it('return 200 http and token', async () => {
    const options = {
      method: 'GET',
      url: '/auth/token',
    };
    const data = await server.inject(options);
    expect(data.statusCode).toBe(200);
    expect(JSON.parse(data.payload)).toHaveProperty('token');
  });
});
