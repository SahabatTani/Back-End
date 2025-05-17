const routes = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUserHandler,
  },
  {
    method: 'GET',
    path: '/users',
    handler: handler.getUserByIdHandler,
    options: {
      auth: 'sahabattani_jwt',
    },
  },
];

module.exports = routes;
