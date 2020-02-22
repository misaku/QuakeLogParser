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
      const newData = Object.entries(this.data);
      return newData.filter(arr => {
        const line = arr[1];
        let cond = true;
        args.forEach(player => {
          if (!line.players.includes(player))
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

}

export default new MainDAO();
