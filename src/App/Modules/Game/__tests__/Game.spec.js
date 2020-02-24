import App from '../../../index';

describe('test Module Game', () => {
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
  describe('route list path /', () => {
    describe('return 200', () => {
      describe('no param', () => {
        it('no args', async () => {
          const options = {
            method: 'GET',
            url: '/games',
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
            };
            const data = await server.inject(options);
            expect(data.statusCode).toBe(200);
            expect(JSON.parse(data.payload)).toEqual({});
          });
          it('valid', async () => {
            const options = {
              method: 'GET',
              url: '/games?players=Isgalamido,Mocinha',
            };
            const data = await server.inject(options);
            expect(data.statusCode).toBe(200);
            expect(JSON.parse(data.payload)).toHaveProperty('game_2');
            expect(JSON.parse(data.payload)).toHaveProperty('game_3');
          });
        });
      });
      describe('with param',()=>{
        it('invalid', async () => {
          const options = {
            method: 'GET',
            url: '/games/dasdas',
          };
          const data = await server.inject(options);
          expect(data.statusCode).toBe(200);
          expect(JSON.parse(data.payload)).toEqual({});
        });
        it('valid', async () => {
          const options = {
            method: 'GET',
            url: '/games/game_2',
          };
          const data = await server.inject(options);
          expect(data.statusCode).toBe(200);
          expect(JSON.parse(data.payload)).toHaveProperty('kills');
          expect(JSON.parse(data.payload)).toHaveProperty('total_kills');
          expect(JSON.parse(data.payload)).toHaveProperty('players');
        });
      })
    });
  });
});
