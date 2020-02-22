import Business from './MainBusiness';

class MainCrontroller {
  store(request) {
    const {
      query,
    } = request;
    return Business.store({ query });
  }
}

export default new MainCrontroller();
