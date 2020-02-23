import DAO from './MainDAO';

class MainBusiness {
  async store({ query }) {
    const qs = query && query.players && query.players.split(',').map(arg => arg.trim()) || null;
    return DAO.store(qs);
  }

  byKey({ params: { key } }) {
    return DAO.byKey(key);
  }
}

export default new MainBusiness();
