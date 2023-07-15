const [getpenyakit, putpenyakit, deletepenyakit, postpenyakit] = require('../handler/data_penyakit');

const penyakitRoutes = [
  {
    method: 'POST',
    path: '/api/penyakitpost',
    handler: postpenyakit,
  },
  {
    method: 'GET',
    path: '/api/penyakitget',
    handler: getpenyakit,
  },
  {
    method: 'PUT',
    path: '/api/penyakitput',
    handler: putpenyakit,
  },
  {
    method: 'DELETE',
    path: '/api/penyakitdelete/{id_penyakit}',
    handler: deletepenyakit,
  },
];

module.exports = penyakitRoutes;
