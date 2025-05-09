const Joi = require('joi');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/authentications',
    handler: handler.postAuthenticationHandler,
    options: {
      tags: ['api'],
      description: 'Menambahkan authentication baru',
      notes: 'Melakukan login untuk mendapatkan access token dan refresh token',
      validate: {
        payload: Joi.object({
          username: Joi.string().required().description('Username pengguna'),
          password: Joi.string().required().description('Password pengguna'),
        }),
      },
      response: {
        status: {
          201: Joi.object({
            status: Joi.string().valid('success').required(),
            message: Joi.string().required(),
            data: Joi.object({
              accessToken: Joi.string().required(),
              refreshToken: Joi.string().required(),
            }),
          }).example({
            status: 'success',
            message: 'Authentication berhasil ditambahkan',
            data: {
              accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
              refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            },
          }),
        },
      },
    },
  },
  {
    method: 'PUT',
    path: '/authentications',
    handler: handler.putAuthenticationHandler,
    options: {
      tags: ['api'],
      description: 'Memperbarui access token',
      notes: 'Menggunakan refresh token untuk mendapatkan access token baru',
      validate: {
        payload: Joi.object({
          refreshToken: Joi.string()
            .required()
            .description('Refresh token pengguna'),
        }),
      },
      response: {
        status: {
          200: Joi.object({
            status: Joi.string().valid('success').required(),
            message: Joi.string().required(),
            data: Joi.object({
              accessToken: Joi.string().required(),
            }),
          }).example({
            status: 'success',
            message: 'Access Token berhasil diperbarui',
            data: {
              accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            },
          }),
        },
      },
    },
  },
  {
    method: 'DELETE',
    path: '/authentications',
    handler: handler.deleteAuthenticationHandler,
    options: {
      tags: ['api'],
      description: 'Menghapus refresh token',
      notes: 'Melakukan logout dan menghapus refresh token',
      validate: {
        payload: Joi.object({
          refreshToken: Joi.string()
            .required()
            .description('Refresh token pengguna'),
        }),
      },
      response: {
        status: {
          200: Joi.object({
            status: Joi.string().valid('success').required(),
            message: Joi.string().required(),
          }).example({
            status: 'success',
            message: 'Refresh token berhasil dihapus',
          }),
        },
      },
    },
  },
];

module.exports = routes;
