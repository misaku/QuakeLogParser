import Hapi from '@hapi/hapi';
import path from 'path';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import HapiSwagger from 'hapi-swagger';
import filterFiles from 'filter-files';
import isDir from 'is-directory';
import hapiAuthJWT from 'hapi-auth-jwt2';

// TRATAMENTO PADRAO PARA ERRO EXIGIDO PELA BIBLIOTECA
process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

const server = Hapi.server({
  port: 3000,
  host: 'localhost',
});

const swaggerConfig = () => {
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

const autenticateConfig = () => {
  const people = {
    1: {
      id: 1,
      name: 'LuizaLabs',
    },
  };
  const validate = async function (decoded, request, h) {
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


const routes = () => {
  // REGEX DE TESTE PARA ARQUIVOS QUE TRMINA COM ROUTE OU ROUTES
  const isRouteFile = fileName => /((routes)|(route))\.js$/.test(fileName.toLowerCase());

  // FUNÇÃO DE NAVEGAÇÃO DE PASTAR E VERIFICAÇÃO DE RESPEITO A CONDIÇÃO DO REGEX
  const getRoutesFilesFromDirname = dirname => {
    return filterFiles.sync(
      dirname,
      (fp, dir) => {
        if (isRouteFile(fp)) {
          return true;
        }

        return isDir.sync(path.join(dir, fp));
      },
      true,
    );
  };
  // AUTO LOAD DE ROTAS
  let Routes = [];
  getRoutesFilesFromDirname(path.join(__dirname, './Modules')).forEach(fileName => {
    Routes = [...Routes, ...(require(fileName).default)];
  });
  server.route(Routes);
};


// START DO SERVER
const start = async () => {
  try {
    await server.register([
      hapiAuthJWT,
      ...swaggerConfig(),
    ]);

    autenticateConfig();
    routes();
    await server.start();
    console.log('Server running on %s', server.info.uri);
    return server;
  } catch (err) {
    console.log(err);
    return null;
  }
};

// START DO SERVER
export const init = async () => {
  try {
    await server.register([
      hapiAuthJWT,
      ...swaggerConfig(),
    ]);

    autenticateConfig();
    routes();
    await server.initialize();
    return server;
  } catch (err) {
    console.log(err);
    return null;
  }
};


export default start;
