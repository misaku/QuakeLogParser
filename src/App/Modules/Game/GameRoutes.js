import Controller from './GameCrontroller';
import Schema from './GameSchema';

export default [
  {
    method: 'GET',
    path: '/games',
    options: {
      auth: {
        mode:'required'
      } ,
      handler: Controller.store,
      description: 'Listar',
      notes: 'Retorna rota com todos os registros',
      tags: ['api','Game'], // ADD THIS TAG
      validate: Schema.store()
    },
  },
  {
    method: 'GET',
    path: '/games/{key}',
    options: {
      auth: {
        mode:'required'
      } ,
      handler: Controller.byKey,
      description: 'Find',
      notes: 'Retora registro com base na key',
      tags: ['api','Game'], // ADD THIS TAG
      validate: Schema.byKey()
    },
  }
];
