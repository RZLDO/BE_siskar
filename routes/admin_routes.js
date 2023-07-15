const [getadmin, putadmin, deleteadmin] = require('../handler/data_admin');

const adminRoutes = [
  {
    method: 'GET',
    path: '/api/adminget',
    handler: getadmin,
  },
  {
    method: 'PUT',
    path: '/api/adminput',
    handler: putadmin,
  },
  {
    method: 'DELETE',
    path: '/api/admindelete/{id_admin}',
    handler: deleteadmin,
  },
];

module.exports = adminRoutes;
