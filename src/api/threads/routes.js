const routes = (handler) => [
  {
    method: 'POST',
    path: '/threads',
    handler: handler.postThreadsHandler,
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
    method: 'GET',
    path: '/threads',
    handler: handler.getThreadsHandler,
  },
  {
    method: 'DELETE',
    path: '/threads/{threadId}',
    handler: handler.deleteThreadsByIdHandler,
    options: {
      auth: 'sahabattani_jwt',
    },
  },
];

module.exports = routes;
