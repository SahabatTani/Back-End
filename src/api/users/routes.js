const Joi = require('joi');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUserHandler,
    options: {
      tags: ['api'],
      description: 'Menambahkan user baru',
      notes: 'Membuat user baru dengan username, password, dan fullname',
      validate: {
        payload: Joi.object({
          username: Joi.string().required(),
          password: Joi.string().required(),
          fullname: Joi.string().required(),
        }),
      },
      response: {
        status: {
          201: Joi.object({
            status: Joi.string().valid('success').required(),
            message: Joi.string().required(),
            data: Joi.object({
              userId: Joi.string().required(),
            }),
          }).example({
            status: 'success',
            message: 'User berhasil ditambahkan',
            data: {
              userId: 'user-eNZ31hX5WK8qnqnO',
            },
          }),
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: handler.getUserByIdHandler,
    options: {
      tags: ['api'],
      description: 'Mendapatkan Data User',
      notes: 'Mendapatkan data user berupa username, password, dan fullname',
      validate: {
        params: Joi.object({
          id: Joi.string().required(),
        }),
      },
      response: {
        status: {
          200: Joi.object({
            status: Joi.string().valid('success').required(),
            data: Joi.object({
              user: Joi.object({
                id: Joi.string().required(),
                username: Joi.string().required(),
                fullname: Joi.string().required(),
              }),
            }),
          }).example({
            status: 'success',
            data: {
              user: {
                id: 'user-boWXKwDbjnNRqv5F',
                username: 'guss',
                fullname: 'Agus Septianto',
              },
            },
          }),
        },
      },
    },
  },
];

module.exports = routes;
