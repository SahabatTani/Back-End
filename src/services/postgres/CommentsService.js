/* eslint-disable object-curly-newline */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class CommentsService {
  constructor(storageService) {
    this._pool = new Pool();
    this._storageService = storageService;
  }

  async addComments({ userId, threadId, content, imageUrl }) {
    const id = `comment-${nanoid(16)}`;
    const createdAt = new Date().toISOString();

    const query = {
      text: `
    INSERT INTO comments (id, user_id, thread_id, content, created_at, image_url) 
    VALUES ($1, $2, $3, $4, $5, $6) 
    RETURNING id
  `,
      values: [id, userId, threadId, content, createdAt, imageUrl],
    };

    try {
      const result = await this._pool.query(query);

      if (!result.rows[0].id) {
        throw new InvariantError('Comment gagal ditambahkan');
      }

      return result.rows[0].id;
    } catch (error) {
      throw new InvariantError('Gagal menambahkan comment');
    }
  }

  async deleteCommentsById(commentId) {
    const query = {
      text: 'DELETE FROM comments WHERE id = $1 RETURNING id',
      values: [commentId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Comment gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = CommentsService;
