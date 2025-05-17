/* eslint-disable object-curly-newline */
/* eslint-disable no-underscore-dangle */
class UsersHandler {
  constructor(usersService, authenticationsService, tokenManager, validator) {
    this._usersService = usersService;
    this._authenticationsService = authenticationsService;
    this._tokenManager = tokenManager;
    this._validator = validator;

    this.postUserHandler = this.postUserHandler.bind(this);
    this.getUserByIdHandler = this.getUserByIdHandler.bind(this);
  }

  async postUserHandler(request, h) {
    this._validator.validateUserPayload(request.payload);
    const { username, email, password, fullname } = request.payload;

    const userId = await this._usersService.addUser({
      username,
      email,
      password,
      fullname,
    });

    const userData = await this._usersService.getUserById(userId);

    const user = {
      username: userData.username,
      email: userData.email,
      fullname: userData.fullname,
    };

    const accessToken = this._tokenManager.generateAccessToken({ id: userId });
    const refreshToken = this._tokenManager.generateRefreshToken({
      id: userId,
    });

    await this._authenticationsService.addRefreshToken(refreshToken);

    const response = h.response({
      status: 'success',
      message: 'User berhasil ditambahkan',
      data: {
        user,
        accessToken,
        refreshToken,
      },
    });
    response.code(201);
    return response;
  }

  async getUserByIdHandler(request) {
    const { id } = request.auth.credentials;
    const userData = await this._usersService.getUserById(id);

    const user = {
      username: userData.username,
      email: userData.email,
      fullname: userData.fullname,
    };

    return {
      status: 'success',
      data: {
        user,
      },
    };
  }
}

module.exports = UsersHandler;
