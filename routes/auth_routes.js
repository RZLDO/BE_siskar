const [loginHandler, registerHandler] = require('../handler/auth_handler');

const authRoutes = [
  {
    method: 'POST',
    path: '/api/login',
    handler: loginHandler,
  },
  {
    method: 'POST',
    path: '/api/register',
    handler: registerHandler,
  },
];

module.exports = authRoutes;
