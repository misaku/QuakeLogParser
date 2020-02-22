import fs from "fs";
import ParserLog from '../../Utils/ParserLog';
import util from "util";

class MainBusiness {
  async store(props) {
    const read = util.promisify(fs.readFile);
    const file = await read('src/games.log', 'utf8');
    const Parser = new ParserLog(file);

    return Parser.separateByRound();
  }
}
export default new MainBusiness();
