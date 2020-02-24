import JWT from 'jsonwebtoken';
import start from '../../../index';

const token = JWT.sign({
  id: 1,
  name: 'LuizaLabs',
}, 'QuakeLogParser-LuizaLabs');
let server;
beforeAll(async (done) => {
  server = await start();
  done();
});

afterAll(async (done) => {
  if (server && server.stop)
    await server.stop({timeout :  0 });
  done();
});

describe('test Module Game', () => {
  describe('route list path /', () => {
    describe('401 not authorizad', () => {
      it('no param', async () => {
        const options = {
          method: 'GET',
          url: '/games',
        };
        const data = await server.inject(options);
        expect(data.statusCode).toBe(401);
        expect(JSON.parse(data.payload)).toHaveProperty('error', 'Unauthorized');
        expect(JSON.parse(data.payload)).toHaveProperty('message', 'Missing authentication');
      });
      it('with param', async () => {
        const options = {
          method: 'GET',
          url: '/games/game_1',
        };
        const data = await server.inject(options);
        expect(data.statusCode).toBe(401);
        expect(JSON.parse(data.payload)).toHaveProperty('error', 'Unauthorized');
        expect(JSON.parse(data.payload)).toHaveProperty('message', 'Missing authentication');
      });
    });

    describe('return 200', () => {
      describe('no param', () => {
        it('no args', async () => {
          const options = {
            method: 'GET',
            url: '/games',
            headers: {
              Authorization: `${token}`,
            },
          };

          const data = await server.inject(options);
          expect(data.statusCode).toBe(200);
          expect(JSON.parse(data.payload)).toHaveProperty('game_1');
          expect(JSON.parse(data.payload)).toHaveProperty('game_2');
        });
        describe('with args', () => {
          it('invalid', async () => {
            const options = {
              method: 'GET',
              url: '/games?players=asdas',
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };
            const data = await server.inject(options);
            expect(data.statusCode).toBe(200);
            expect(JSON.parse(data.payload)).toEqual({});
          });
          it('valid', async () => {
            const options = {
              method: 'GET',
              url: '/games?players=Isgalamido,Mocinha',
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };
            const data = await server.inject(options);
            expect(data.statusCode).toBe(200);
            expect(JSON.parse(data.payload)).toHaveProperty('game_2');
            expect(JSON.parse(data.payload)).toHaveProperty('game_3');
          });
        });
      });
      describe('with param', () => {
        it('invalid', async () => {
          const options = {
            method: 'GET',
            url: '/games/dasdas',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const data = await server.inject(options);
          expect(data.statusCode).toBe(200);
          expect(JSON.parse(data.payload)).toEqual({});
        });
        it('valid', async () => {
          const options = {
            method: 'GET',
            url: '/games/game_2',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const data = await server.inject(options);
          expect(data.statusCode).toBe(200);
          expect(JSON.parse(data.payload)).toHaveProperty('kills');
          expect(JSON.parse(data.payload)).toHaveProperty('total_kills');
          expect(JSON.parse(data.payload)).toHaveProperty('players');
        });
      });
    });
  });
});
