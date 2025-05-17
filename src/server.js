/* eslint-disable import/order */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();

const apiDocs = require('./../src/api/apiDocs');

const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');

const ClientError = require('./exceptions/ClientError');

// storage
const StorageService = require('./services/storage/StorageService');

// users
const users = require('./api/users');
const UsersService = require('./services/postgres/UsersService');
const UsersValidator = require('./validator/users');

// authentications
const authentications = require('./api/authentications');
const AuthenticationsService = require('./services/postgres/AuthenticationsService');
const TokenManager = require('./tokenize/TokenManager');
const AuthenticationsValidator = require('./validator/authentications');

// threads
const threads = require('./api/threads');
const ThreadsService = require('./services/postgres/ThreadsService');
const ThreadsValidator = require('./validator/threads');

// comments
const comments = require('./api/comments');
const CommentsService = require('./services/postgres/CommentsService');
const CommentsValidator = require('./validator/comments');

const init = async () => {
  const storageService = new StorageService();
  const usersService = new UsersService();
  const authenticationsService = new AuthenticationsService();
  const threadsService = new ThreadsService(storageService);
  const commentsService = new CommentsService(storageService);

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: Jwt,
    },
    {
      plugin: Inert,
    },
  ]);

  server.auth.strategy('sahabattani_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });

  await server.register([
    Inert,
    Vision,
    {
      plugin: users,
      options: {
        usersService,
        authenticationsService,
        tokenManager: TokenManager,
        validator: UsersValidator,
      },
    },
    {
      plugin: authentications,
      options: {
        authenticationsService,
        usersService,
        tokenManager: TokenManager,
        validator: AuthenticationsValidator,
      },
    },
    {
      plugin: threads,
      options: {
        threadsService,
        storageService,
        validator: ThreadsValidator,
      },
    },
    {
      plugin: comments,
      options: {
        commentsService,
        storageService,
        validator: CommentsValidator,
      },
    },
  ]);

  server.route(apiDocs);

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }
    return h.continue;
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
