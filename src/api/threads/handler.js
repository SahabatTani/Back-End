/* eslint-disable comma-dangle */
/* eslint-disable no-underscore-dangle */
class ThreadsHandler {
  constructor(threadsService, storageService, validator) {
    this._service = threadsService;
    this._storageService = storageService;
    this._validator = validator;

    this.postThreadsHandler = this.postThreadsHandler.bind(this);
    this.getThreadsHandler = this.getThreadsHandler.bind(this);
    this.getThreadByIdHandler = this.getThreadByIdHandler.bind(this);
    this.getThreadsByKeywordHandler = this.getThreadsByKeywordHandler.bind(this);
    this.deleteThreadsByIdHandler = this.deleteThreadsByIdHandler.bind(this);
  }

  async postThreadsHandler(request, h) {
    this._validator.validatePostThreadsPayload(request.payload);
    const { title, content } = request.payload;
    const { id: userId } = request.auth.credentials;

    let imageUrl = null;

    if (request.payload.file) {
      const { file } = request.payload;
      try {
        imageUrl = await this._storageService.writeFile(
          file,
          file.hapi,
          userId,
          'threads'
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

    const threadId = await this._service.addThreads({
      userId,
      title,
      content,
      imageUrl,
    });

    const response = h.response({
      status: 'success',
      message: 'Threads berhasil ditambahkan',
      data: {
        threadId,
      },
    });
    response.code(201);
    return response;
  }

  async getThreadsHandler() {
    const threads = await this._service.getThreads();
    return {
      status: 'success',
      data: {
        threads,
      },
    };
  }

  async getThreadByIdHandler(request) {
    const { threadId } = request.params;

    const thread = await this._service.getThreadsById(threadId);

    return {
      status: 'success',
      data: {
        thread,
      },
    };
  }

  async getThreadsByKeywordHandler(request) {
    const { keyword } = request.params;
    const threads = await this._service.getThreadsByKeyword(keyword);
    return {
      status: 'success',
      data: {
        threads,
      },
    };
  }

  async deleteThreadsByIdHandler(request) {
    const { threadId } = request.params;

    await this._service.deleteThreadsById(threadId);

    return {
      status: 'success',
      message: 'Thread berhasil dihapus',
    };
  }
}

module.exports = ThreadsHandler;
