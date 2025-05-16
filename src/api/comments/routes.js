const routes = (handler) => [
  {
    method: 'POST',
    path: '/comments/{threadId}',
    handler: handler.postCommentsHandler,
    options: {
      auth: 'sahabattani_jwt',
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
        maxBytes: 1048576,
      },
    },
  },
  {
    method: 'DELETE',
    path: '/comments/{commentId}',
    handler: handler.deleteCommentsByIdHandler,
    options: {
      auth: 'sahabattani_jwt',
    },
  },
];

module.exports = routes;
