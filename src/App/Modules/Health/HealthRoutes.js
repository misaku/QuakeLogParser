import Controller from './HealthCrontroller';

export default [
  {
    method: 'GET',
    path: '/',
    options: {
      handler: Controller.store,
      description: 'Listar',
      notes: 'Retorna status do servidor',
      tags: ['api','Health'], // ADD THIS TAG
    },
  },
];
