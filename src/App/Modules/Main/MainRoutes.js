import Controller from './MainCrontroller';
import Schema from './MainSchema';

export default [
  {
    method: 'GET',
    path: '/',
    options: {
      handler: Controller.store,
      description: 'Listar',
      notes: 'Retorna rota com todos os registros',
      tags: ['api','Main'], // ADD THIS TAG
      validate: Schema.store()
    },
  }
];
