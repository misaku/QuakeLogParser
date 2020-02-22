import Joi from '@hapi/joi';

class MainSchema {
  static store() {
    return {
      query: Joi.object({
        players: Joi.string()
          .optional()
          .description('Campo usado para filtrar por players'),
      }),
    };
  }
}
export default MainSchema;
