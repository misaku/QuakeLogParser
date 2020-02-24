import path from 'path';
import filterFiles from 'filter-files';
import isDir from 'is-directory';
import hapiAuthJWT from 'hapi-auth-jwt2';
import MainApp from './MainApp';
import { autenticateConfig, swaggerConfig } from './AppConfig';

class App extends MainApp {
  async registerPlugins() {
    super.registerPlugins();
    await this.server.register([
      hapiAuthJWT,
      ...swaggerConfig(),
    ]);
  }

  async postRegisterPlugins() {
    super.postRegisterPlugins();
    autenticateConfig(this.server);
  }

  async routes() {
    super.routes();
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
}

export default App;
