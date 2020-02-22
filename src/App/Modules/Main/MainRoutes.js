import Controller from './MainCrontroller';
export default (server)=>{
  server.route({
    method: 'GET',
    path: '/',
    handler:Controller.store})
};
