/* eslint-disable object-curly-newline */
const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');

/* eslint-disable no-underscore-dangle */
class ThreadsService {
  constructor() {
    this._pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  }

  async addThreads({ userId, title, content, imageUrl }) {
    const id = `threads-${nanoid(16)}`;
    const createdAt = new Date().toISOString();

    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, userId, title, content, createdAt, imageUrl],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Threads gagal ditambahkan');
    }

    return result.rows[0].id;
  }
}

module.exports = ThreadsService;
