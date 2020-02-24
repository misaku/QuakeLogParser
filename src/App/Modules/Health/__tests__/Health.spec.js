import App from '../../../index';

let server;
beforeAll(async (done) => {
  const FactoryServer = new App();
  await FactoryServer.init();
  server = FactoryServer.server;
  done();
},30000);

afterAll(async (done) => {
  if(server&&server.stop)
    await server.stop({timeout :  0 });
  done();
}, 30000);
describe('test Module Health', () => {


  it('return 200 http status OK', async () => {
    const options = {
      method: 'GET',
      url: '/',
    };
    const data = await server.inject(options);
    expect(data.statusCode).toBe(200);
    expect(JSON.parse(data.payload)).toHaveProperty('status', 'OK');
  });
});
