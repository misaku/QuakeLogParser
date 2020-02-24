import JWT from 'jsonwebtoken';

class AuthBusiness {
  async store() {
    const token = JWT.sign({
      id: 1,
      name: 'LuizaLabs',
    }, 'QuakeLogParser-LuizaLabs');
    return { token };
  }
}

export default new AuthBusiness();
