const Hapi = require('@hapi/hapi');

const authRoutes = require('./routes/auth_routes');
const server = new Hapi.server({
  port: 5000,
  host: '192.168.100.84',
});
const init = async () => {
  await server.start();
  server.route([...authRoutes]);
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
