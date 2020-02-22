import Controller from './MainCrontroller';

export default [
  {
    method: 'GET',
    path: '/',
    options: {
      handler: Controller.store,
      description: 'Listar',
      notes: 'Retorna rota com todos os registros',
      tags: ['api'], // ADD THIS TAG
      validate: {

      }
    },
  }
];
