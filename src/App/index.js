import Hapi from '@hapi/hapi';
import path from 'path';
import isDir from 'is-directory';
import filterFiles from 'filter-files';

class App {
  constructor() {
    // TRATAMENTO PADRAO PARA ERRO EXIGIDO PELA BIBLIOTECA
    process.on('unhandledRejection', (err) => {
      console.log(err);
      process.exit(1);
    });

    // CHAMADA DOS METODOS DE INICIALIZAÇÃO DA APLICAÇÃO
    this.init();
    this.routes();
    this.start();
  }
  // CONFIGURAÇÃO DO INICIO DO SERVER
  init(){
    this.server = Hapi.server({
      port: 3000,
      host: 'localhost'
    });
  }

  // METODO DE ROTEAMENTO
  routes(){
    // REGEX DE TESTE PARA ARQUIVOS QUE TRMINA COM ROUTE OU ROUTES
    const isRouteFile = fileName => /((routes)|(route))\.js$/.test(fileName.toLowerCase())

    // FUNÇÃO DE NAVEGAÇÃO DE PASTAR E VERIFICAÇÃO DE RESPEITO A CONDIÇÃO DO REGEX
    const getRoutesFilesFromDirname = dirname => {
      return filterFiles.sync(dirname, (fp, dir, files, recurse) => {
        if (isRouteFile(fp)) {
          return true
        }

        return isDir.sync(path.join(dir, fp))
      }, true)
    }
    // AUTO LOAD DE ROTAS
    getRoutesFilesFromDirname(path.join(__dirname,'./Modules'))
      .forEach(fileName => {
               (require(fileName).default)(this.server);
      })
  }

  // START DO SERVER
  async start(){
    await this.server.start();
    console.log('Server running on %s', this.server.info.uri);
  }
}

export default App;
