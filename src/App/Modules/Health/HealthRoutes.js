import Controller from './HealthCrontroller';

export default [
  {
    method: 'GET',
    path: '/',
    options: {
      auth: {
        mode:'try'
      },
      handler: Controller.store,
      description: 'Listar',
      notes: 'Retorna status do servidor',
      tags: ['api','Health'], // ADD THIS TAG
    },
  },
];
