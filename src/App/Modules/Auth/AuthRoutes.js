import Controller from './AuthCrontroller';

export default [
  {
    method: 'GET',
    path: '/auth/token',
    options: {
      auth: {
        mode:'try'
      },
      handler: Controller.store,
      description: 'Listar',
      notes: 'Retorna Token',
      tags: ['api','Auth'], // ADD THIS TAG
    },
  },
];
