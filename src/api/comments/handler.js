/* eslint-disable comma-dangle */
/* eslint-disable no-underscore-dangle */
class CommentsHandler {
  constructor(commentsService, storageService, validator) {
    this._commentsService = commentsService;
    this._storageService = storageService;
    this._validator = validator;

    this.postCommentsHandler = this.postCommentsHandler.bind(this);
    this.deleteCommentsByIdHandler = this.deleteCommentsByIdHandler.bind(this);
  }

  async postCommentsHandler(request, h) {
    this._validator.validatePostCommentsPayload(request.payload);
    const { content } = request.payload;
    const { id: userId } = request.auth.credentials;
    const { threadId } = request.params;

    let imageUrl = null;

    if (request.payload.file) {
      const { file } = request.payload;
      try {
        imageUrl = await this._storageService.writeFile(
          file,
          file.hapi,
          userId,
          'comments'
        );
      } catch (err) {
        return h
          .response({
            status: 'fail',
            message: `Gagal mengunggah gambar: ${err.message}`,
          })
          .code(500);
      }
    }

    const commentId = await this._commentsService.addComments({
      userId,
      threadId,
      content,
      imageUrl,
    });

    const response = h.response({
      status: 'success',
      message: 'Comments berhasil ditambahkan',
      data: {
        commentId,
      },
    });
    response.code(201);
    return response;
  }

  async deleteCommentsByIdHandler(request) {
    const { commentId } = request.params;

    await this._commentsService.deleteCommentsById(commentId);

    return {
      status: 'success',
      message: 'Comments berhasil dihapus',
    };
  }
}

module.exports = CommentsHandler;
