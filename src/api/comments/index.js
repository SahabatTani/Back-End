/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
const CommentsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'comments',
  version: '1.0.0',
  register: async (server, { commentsService, storageService, validator }) => {
    const commentsHandler = new CommentsHandler(
      commentsService,
      storageService,
      validator
    );
    server.route(routes(commentsHandler));
  },
};
