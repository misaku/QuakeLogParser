import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import HapiSwagger from 'hapi-swagger';

// CONFIRGURAÇÃO DO SWAGGER
export const swaggerConfig = () => {
  const swaggerOptions = {
    info: {
      title: 'Quake log parser API',
      description: 'Quake Log Parser é uma ferramenta tilizada para trasformar o log de ugame' +
        ' em um objeto, a partir dessa api podemos usar esse obejeto para poder manipulalo e' +
        ' consumir a api',
      version: '1.0.0',
    },
    securityDefinitions: {
      jwt: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
    documentationPath: '/doc',
    grouping: 'tags',
    tags: [
      {
        name: 'Game',
        description: 'Rotas voltadas para consumir log',
      }, {
        name: 'Health',
        description: 'Rota voltada para receber status do servidor',
      },
    ],
    security: [{ jwt: [] }],
  };
  return [
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ];
};

// CONFIGURAÇÃO DO PLUGIN DE AUTENTICAÇÃO
export const autenticateConfig = (server) => {
  const people = {
    1: {
      id: 1,
      name: 'LuizaLabs',
    },
  };
  const validate = async (decoded)=>{
    if (!people[decoded.id]) {
      return { isValid: false };
    }
    return { isValid: true };
  };
  server.auth.strategy('jwt', 'jwt',
    {
      key: 'QuakeLogParser-LuizaLabs',
      validate,
      verifyOptions: { ignoreExpiration: true },
    });

  server.auth.default('jwt');
};
