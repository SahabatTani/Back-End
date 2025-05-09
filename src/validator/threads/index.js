const InvariantError = require('../../exceptions/InvariantError');
const { PostThreadsPayloadSchema } = require('./schema');

const ThreadsValidator = {
  validatePostThreadsPayload: (payload) => {
    const validationResult = PostThreadsPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = ThreadsValidator;
