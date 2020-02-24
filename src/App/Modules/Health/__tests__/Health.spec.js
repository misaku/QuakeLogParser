import App from '../../../index';

describe('test Module Health', () => {
  let server;

  beforeAll(async (done) => {
    try {
      server = await App.start();
      done();
    } catch (e) {
      console.log('error before all', e);
    }
  });

  afterAll(async (done) => {
    try {
      await server.stop();
      done();
    } catch (e) {
      console.log('error before all', e);
    }
  });
  it('return 200 http status OK', async () => {
    const options = {
      method: 'GET',
      url: '/',
    };
    const data = await server.inject(options);
    expect(data.statusCode).toBe(200);
    expect(JSON.parse(data.payload)).toHaveProperty('status','OK');
  });
});
