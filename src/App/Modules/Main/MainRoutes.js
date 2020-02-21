export default (server)=>{
  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, h) {
      return `Hello world!`;
    }})
};
