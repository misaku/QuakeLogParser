import fs from "fs";
import ParserLog from '../../../Utils/ParserLog';
import util from "util";
import DAO from '../MainDAO';

describe('test class DAO of Main', () => {
  beforeAll(async ()=>{
    const read = util.promisify(fs.readFile);
    const file = await read('src/data/games.log', 'utf8');
    DAO.data = new ParserLog(file).output;
  })
  describe('test mathod byKey',()=>{
    it('no key valid',async ()=>{
      const res = DAO.byKey('çasd123')
      expect(res).toEqual({});
    })
    it('key is valid',()=>{
      const res = DAO.byKey('game_1')
      expect(res).toHaveProperty('kills');
      expect(res).toHaveProperty('total_kills');
      expect(res).toHaveProperty('players');
    });
  })
});
