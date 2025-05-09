/* eslint-disable comma-dangle */
/* eslint-disable no-underscore-dangle */
class ThreadsHandler {
  constructor(threadsService, storageService, validator) {
    this._service = threadsService;
    this._storageService = storageService;
    this._validator = validator;

    this.postThreadsHandler = this.postThreadsHandler.bind(this);
  }

  async postThreadsHandler(request, h) {
    this._validator.validatePostThreadsPayload(request.payload);
    const { title, content } = request.payload;
    const { id: userId } = request.auth.credentials;

    let imageUrl = null;

    if (request.payload.file) {
      const { file } = request.payload;
      const filename = await this._storageService.writeFile(
        file,
        file.hapi,
        userId
      );
      imageUrl = `http://${process.env.HOST}:${process.env.PORT}/images/threads/${filename}`;
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
}

module.exports = ThreadsHandler;
