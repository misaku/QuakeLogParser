import Business from './AuthBusiness';

class AuthCrontroller {
  store() {
    return Business.store();
  }
}

export default new AuthCrontroller();
