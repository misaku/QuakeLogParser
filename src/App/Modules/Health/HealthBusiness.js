class HealthBusiness {
  async store() {
    return { status: 'OK' };
  }
}

export default new HealthBusiness();
