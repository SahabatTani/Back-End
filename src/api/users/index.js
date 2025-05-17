/* eslint-disable comma-dangle */
/* eslint-disable object-curly-newline */
const UsersHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'users',
  version: '1.0.0',
  register: async (
    server,
    { usersService, authenticationsService, tokenManager, validator }
  ) => {
    const usersHandler = new UsersHandler(
      usersService,
      authenticationsService,
      tokenManager,
      validator
    );
    server.route(routes(usersHandler));
  },
};
