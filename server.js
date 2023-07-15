const Hapi = require('@hapi/hapi');

const authRoutes = require('./routes/auth_routes');
const adminRoutes = require('./routes/admin_routes');
const penyakitRoutes = require('./routes/penyakit_routes');
const gejalaRoutes = require('./routes/gejala_routes');
const server = new Hapi.server({
  port: 5000,
  host: '192.168.100.86',
});
const init = async () => {
  await server.start();
  server.route([...authRoutes, ...adminRoutes, ...penyakitRoutes, ...gejalaRoutes]);
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
