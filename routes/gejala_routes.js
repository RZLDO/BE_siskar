const [getgejala, putgejala, deletegejala, postgejala] = require('../handler/data_gejala');

const gejalaRoutes = [
  {
    method: 'POST',
    path: '/api/gejalapost',
    handler: postgejala,
  },
  {
    method: 'GET',
    path: '/api/gejalaget',
    handler: getgejala,
  },
  {
    method: 'PUT',
    path: '/api/gejalaput',
    handler: putgejala,
  },
  {
    method: 'DELETE',
    path: '/api/gejaladelete/{id_gejala}',
    handler: deletegejala,
  },
];

module.exports = gejalaRoutes;
