import Business from './HealthBusiness';

class HealthCrontroller {
  store() {
    return Business.store();
  }
}

export default new HealthCrontroller();
