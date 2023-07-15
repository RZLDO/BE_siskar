const [getbobot, putbobot, deletebobot, postbobot] = require('../handler/data_bobot');

const bobotRoutes = [
  {
    method: 'POST',
    path: '/api/bobotpost',
    handler: postbobot,
  },
  {
    method: 'GET',
    path: '/api/bobotget',
    handler: getbobot,
  },
  {
    method: 'PUT',
    path: '/api/bobotput',
    handler: putbobot,
  },
  {
    method: 'DELETE',
    path: '/api/bobotdelete/{id_bobot}',
    handler: deletebobot,
  },
];

module.exports = bobotRoutes;
