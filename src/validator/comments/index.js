const InvariantError = require('../../exceptions/InvariantError');
const { PostCommentsPayloadSchema } = require('./schema');

const CommentsValidator = {
  validatePostCommentsPayload: (payload) => {
    const validationResult = PostCommentsPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = CommentsValidator;
