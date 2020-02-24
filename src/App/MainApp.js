import Hapi from '@hapi/hapi';

class MainApp {
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

  async preRegisterPlugins() {
    // ESPAÇO USADO PARA FUTURAS CONFIGURAÇÕES QUE DEVERÃO SER EXECUTADAS ANTES DE UM REGISTRO
    // DE UM PLUGIN
  }

  async registerPlugins() {
    // ESPAÇO PARA COLOCAR OS REGISTROS DE PLUGINS
  }

  async postRegisterPlugins() {
    // ESPAÇO USADO PARA FUTURAS CONFIGURAÇÕES POS REGISTRO DE PLUGINS
  }

  async preRoutes() {
    // ESPAÇO USADO PARA FUTURAS CONFIGURAÇÕES ANTES DO REGISTRO DAS ROTAS
  }

  async routes() {
    // ESPAÇO USADO PARA REGISTRAR ROTAS
  }

  async postRoutes() {
    // ESPAÇO USADO PARA FUTURAS CONFIGURAÇÕES POS REGISTRO DE ROTAS
  }

  // METODO USADO PARA INICIALIZAR O SISTEMA SEM ALOAÇÃO DE UMA PORTA, GERALMENTE SERÁ USADO
  // PARA FAZER TESTES NA APALIAÇÃO
  async init() {
    await this.preRegisterPlugins();
    await this.registerPlugins();
    await this.postRegisterPlugins();
    await this.preRoutes();
    await this.routes();
    await this.postRoutes();
    await this.server.initialize();
  }

// START DO SERVER
  async start() {
    await this.preRegisterPlugins();
    await this.registerPlugins();
    await this.postRegisterPlugins();
    await this.preRoutes();
    await this.routes();
    await this.postRoutes();
    await this.server.start();
    console.log('Server running on %s', this.server.info.uri);
  }
}

export default MainApp;
