/* eslint-disable object-curly-newline */
const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

/* eslint-disable no-underscore-dangle */
class ThreadsService {
  constructor() {
    this._pool = new Pool();
  }

  async addThreads({ userId, title, content, imageUrl }) {
    const id = `threads-${nanoid(16)}`;
    const createdAt = new Date().toISOString();

    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, userId, title, content, createdAt, imageUrl],
    };

    try {
      const result = await this._pool.query(query);

      if (!result.rows[0].id) {
        throw new InvariantError('Threads gagal ditambahkan');
      }

      return result.rows[0].id;
    } catch (error) {
      throw new InvariantError('Gagal menambahkan thread');
    }
  }

  async getThreads() {
    try {
      const query = `
        SELECT id, user_id, title, content, created_at, image_url
        FROM threads
        ORDER BY created_at DESC
      `;

      const result = await this._pool.query(query);

      return result.rows;
    } catch (error) {
      throw new InvariantError('Gagal mengambil data threads');
    }
  }

  async deleteThreadsById(threadId) {
    const query = {
      text: 'DELETE FROM threads WHERE id = $1 RETURNING id',
      values: [threadId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Threads gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = ThreadsService;
