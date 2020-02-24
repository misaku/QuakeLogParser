import Business from './GameBusiness';

class GameCrontroller {
  store(request) {
    const {
      query,
    } = request;
    return Business.store({ query });
  }

  byKey(request) {
    const {
      params,
    } = request;
    return Business.byKey({ params });
  }
}

export default new GameCrontroller();
