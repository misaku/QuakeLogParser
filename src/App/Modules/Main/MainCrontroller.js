import Business from './MainBusiness';
class MainCrontroller {
  store (request, h) {
    return Business.store();
  }
}

export default new MainCrontroller();
