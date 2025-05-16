const Joi = require('joi');

const PostCommentsPayloadSchema = Joi.object({
  content: Joi.string().required(),
  file: Joi.any()
    .optional()
    .custom((value, helpers) => {
      if (!value || !value.hapi) return value;

      const allowedMimeTypes = ['image/jpeg', 'image/png'];
      const { headers } = value.hapi;

      if (!allowedMimeTypes.includes(headers['content-type'])) {
        return helpers.message('File harus berupa gambar JPEG atau PNG');
      }

      return value;
    }),
});

module.exports = {
  PostCommentsPayloadSchema,
};
