import Hapi from '@hapi/hapi';
import path from 'path';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import HapiSwagger from 'hapi-swagger';
import filterFiles from 'filter-files';
import isDir from 'is-directory';

class App {
  constructor() {
    // TRATAMENTO PADRAO PARA ERRO EXIGIDO PELA BIBLIOTECA
    process.on('unhandledRejection', err => {
      console.log(err);
      process.exit(1);
    });
    this.server = Hapi.server({
      port: 3000,
      host: 'localhost',
    });
  }

  // METODO DE ROTEAMENTO
  routes() {
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
    this.server.route(Routes);
  }

  async swaggerConfig() {
    const swaggerOptions = {
      info: {
        title: 'Quake log parser API',
        description: 'Quake Log Parser é uma ferramenta tilizada para trasformar o log de ugame' +
          ' em um objeto, a partir dessa api podemos usar esse obejeto para poder manipulalo e' +
          ' consumir a api',
        version: '1.0.0',
      },
      documentationPath: '/doc',
      grouping: 'tags',
      tags: [
        {
          name: 'Main',
          description: 'API voltada para consumir log',
        },
      ],
    };
    await this.server.register([
      Inert,
      Vision,
      {
        plugin: HapiSwagger,
        options: swaggerOptions,
      },
    ]);
  }

  async loadPlugins() {
    await this.swaggerConfig();
  }

  // START DO SERVER
  async start() {
    try {
      await this.loadPlugins();
      this.routes();
      await this.server.start();
      console.log('Server running on %s', this.server.info.uri);
      return this.server;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

export default new App();
