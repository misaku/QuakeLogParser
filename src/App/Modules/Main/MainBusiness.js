import fs from 'fs';
import util from 'util';
import ParserLog from '../../Utils/ParserLog';

class MainBusiness {
  async store() {
    const read = util.promisify(fs.readFile);
    const file = await read('src/games.log');
    return new ParserLog(file).output;
  }
}
export default new MainBusiness();
