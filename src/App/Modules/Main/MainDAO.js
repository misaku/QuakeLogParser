import fs from 'fs';
import util from 'util';
import ParserLog from '../../Utils/ParserLog';

class MainDAO {
  constructor() {
    this.initData();
  }

  async initData() {
    const read = util.promisify(fs.readFile);
    const file = await read('src/data/games.log', 'utf8');
    this.data = new ParserLog(file).output;
  }

  store(args = null) {
    if (args) {
      const newData = Array.from(this.data);
      return newData.filter(line => (line.players === args));
    }
    return this.data;
  }
}
