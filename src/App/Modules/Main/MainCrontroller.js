import Business from './MainBusiness';

class MainCrontroller {
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

export default new MainCrontroller();
