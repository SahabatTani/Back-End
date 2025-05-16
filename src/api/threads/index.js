/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
const ThreadsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'threads',
  version: '1.0.0',
  register: async (server, { threadsService, storageService, validator }) => {
    const threadsHandler = new ThreadsHandler(
      threadsService,
      storageService,
      validator
    );
    server.route(routes(threadsHandler));
  },
};
