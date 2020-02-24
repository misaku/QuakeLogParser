import fs from 'fs';
import util from 'util';
import ParserLog from '../../Utils/ParserLog';

class GameDAO {
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
      const newData = Object.entries(this.data);
      return newData.filter(arr => {
        const line = arr[1];
        let cond = true;
        const players = line.players.map(p=>p.toLowerCase());
        args.forEach(player => {
          if (!players.includes(player.toLowerCase()))
            cond = false;
        });
        return cond;
      }).reduce((accum, [k, v]) => {
        accum[k] = v;
        return accum;
      }, {});

    }
    return this.data;
  }

  byKey(Key) {
    return this.data[Key] || {}
  }

}

export default new GameDAO();
