import fs from 'fs';
import util from 'util';
import ParserLog from '../../../Utils/ParserLog';
import DAO from '../MainDAO';

describe('test class DAO of Main', () => {
  beforeAll(async (done) => {
    const read = util.promisify(fs.readFile);
    const file = await read('src/data/games.log', 'utf8');
    DAO.data = new ParserLog(file).output;
    done();
  });
  describe('test mathod byKey', () => {
    it('no key valid', async () => {
      const res = DAO.byKey('çasd123');
      expect(res).toEqual({});
    });
    it('key is valid', () => {
      const res = DAO.byKey('game_1');
      expect(res).toHaveProperty('kills');
      expect(res).toHaveProperty('total_kills');
      expect(res).toHaveProperty('players');
    });
  });
  describe('test mathod store', () => {
    it('no args', () => {
      const res = DAO.store();
      expect(res).not.toEqual({});
      expect(res.game_1).toHaveProperty('kills');
      expect(res.game_1).toHaveProperty('total_kills');
      expect(res.game_1).toHaveProperty('players');
    });
    it('no args valid', () => {
      const res = DAO.store(['asd', 'aaf']);
      expect(res).toEqual({});
    });
    it('args valid', () => {
      const res = DAO.store(['Isgalamido', 'Mocinha']);
      expect(res).not.toEqual({});
      expect(res.game_2).toHaveProperty('kills');
      expect(res.game_2).toHaveProperty('total_kills');
      expect(res.game_2).toHaveProperty('players');
    });
  });
});
