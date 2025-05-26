/* eslint-disable comma-dangle */
/* eslint-disable object-curly-newline */
const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

/* eslint-disable no-underscore-dangle */
class ThreadsService {
  constructor(storageService) {
    this._pool = new Pool();
    this._storageService = storageService;
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
      SELECT 
        t.id, 
        u.fullname,
        u.username,
        t.title, 
        t.content, 
        t.created_at, 
        t.image_url,
        COUNT(c.id) AS total_comments
      FROM threads t
      JOIN users u ON u.id = t.user_id
      LEFT JOIN comments c ON t.id = c.thread_id
      GROUP BY t.id, u.fullname, u.username
      ORDER BY t.created_at DESC;
    `;

      const result = await this._pool.query(query);
      return result.rows;
    } catch (error) {
      throw new InvariantError(
        `Gagal mengambil data threads: ${error.message}`
      );
    }
  }

  async getThreadsById(threadId) {
    try {
      const query = {
        text: `
      SELECT 
        t.id, 
        u.fullname,
        u.username,
        t.title, 
        t.content, 
        t.created_at, 
        t.image_url,
        COALESCE(
          json_agg(
            json_build_object(
              'id', c.id,
              'fullname', commenter.fullname,
              'username', commenter.username,
              'content', c.content,
              'image_url', c.image_url,
              'created_at', c.created_at
            ) ORDER BY c.created_at DESC
          ) FILTER (WHERE c.id IS NOT NULL), 
          '[]'::json
        ) AS comments
      FROM threads t
      JOIN users u ON u.id = t.user_id
      LEFT JOIN comments c ON t.id = c.thread_id
      LEFT JOIN users commenter ON commenter.id = c.user_id
      WHERE t.id = $1
      GROUP BY t.id, u.fullname, u.username
      LIMIT 1;
      `,
        values: [threadId],
      };

      const result = await this._pool.query(query);

      if (!result.rows.length) {
        throw new NotFoundError('Thread tidak ditemukan');
      }

      return result.rows[0];
    } catch (error) {
      throw new InvariantError(`Gagal mengambil thread: ${error.message}`);
    }
  }

  async getThreadsByKeyword(keyword) {
    try {
      const query = {
        text: `
        SELECT 
          t.id, 
          u.fullname, 
          u.username,
          t.title, 
          t.content, 
          t.created_at, 
          t.image_url,
          COALESCE(
            json_agg(
              json_build_object(
                'id', c.id,
                'fullname', commenter.fullname,
                'username', commenter.username,
                'content', c.content,
                'image_url', c.image_url,
                'created_at', c.created_at
              ) ORDER BY c.created_at DESC
            ) FILTER (WHERE c.id IS NOT NULL), 
            '[]'::json
          ) AS comments
        FROM threads t
        JOIN users u ON u.id = t.user_id
        LEFT JOIN comments c ON t.id = c.thread_id
        LEFT JOIN users commenter ON commenter.id = c.user_id
        WHERE t.title ILIKE $1 OR t.content ILIKE $1
        GROUP BY t.id, u.fullname, u.username
        ORDER BY t.created_at DESC;
      `,
        values: [`%${keyword}%`],
      };

      const result = await this._pool.query(query);

      return result.rows;
    } catch (error) {
      throw new InvariantError(`Gagal mencari data threads: ${error.message}`);
    }
  }

  async deleteThreadsById(threadId) {
    const getImageQuery = {
      text: 'SELECT image_url FROM threads WHERE id = $1',
      values: [threadId],
    };

    const deleteThreadQuery = {
      text: 'DELETE FROM threads WHERE id = $1 RETURNING id',
      values: [threadId],
    };

    try {
      const imageResult = await this._pool.query(getImageQuery);

      if (!imageResult.rows.length) {
        throw new NotFoundError('Threads tidak ditemukan');
      }

      const imageUrl = imageResult.rows[0].image_url;

      const result = await this._pool.query(deleteThreadQuery);

      if (!result.rows.length) {
        throw new NotFoundError('Threads gagal dihapus');
      }

      if (imageUrl) {
        const filePath = imageUrl.split(
          `/storage/v1/object/public/${this._storageService._bucketName}/`
        )[1];
        await this._storageService.deleteFile(filePath);
      }
    } catch (error) {
      throw new InvariantError(`Gagal menghapus thread: ${error.message}`);
    }
  }
}

module.exports = ThreadsService;
