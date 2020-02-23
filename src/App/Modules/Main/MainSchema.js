import Joi from '@hapi/joi';

class MainSchema {
  static store() {
    return {
      query: Joi.object({
        players: Joi.string()
          .optional()
          .example('joão,josé')
          .description('Campo usado para filtrar por players'),
      }),
    };
  }

  static byKey() {
    return {
      params: Joi.object({
        key: Joi.string()
          .required()
          .example('game_18')
          .description('Chave do da partida'),
      }),
    };
  }
}
export default MainSchema;
