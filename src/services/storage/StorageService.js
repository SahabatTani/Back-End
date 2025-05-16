/* eslint-disable comma-dangle */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
const { createClient } = require('@supabase/supabase-js');

class StorageService {
  constructor() {
    this._supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY
    );
    this._bucketName = 'images';
  }

  async writeFile(file, meta, userId, path) {
    try {
      const filename = `${Date.now()}_${userId}_${meta.filename}`;
      const buffer = await this._streamToBuffer(file);

      const { error } = await this._supabase.storage
        .from(this._bucketName)
        .upload(`${path}/${filename}`, buffer, {
          contentType: meta.headers['content-type'],
          upsert: true,
        });

      if (error) {
        throw new Error(`Gagal mengunggah file ke Supabase: ${error.message}`);
      }

      const { data } = this._supabase.storage
        .from(this._bucketName)
        .getPublicUrl(`${path}/${filename}`);

      return data.publicUrl;
    } catch (error) {
      throw new Error(`Gagal menyimpan file: ${error.message}`);
    }
  }

  async deleteFile(filePath) {
    try {
      const { error } = await this._supabase.storage
        .from(this._bucketName)
        .remove([filePath]);

      if (error) {
        throw new Error(`Gagal menghapus file: ${error.message}`);
      }
    } catch (error) {
      throw new Error(`Gagal menghapus file: ${error.message}`);
    }
  }

  _streamToBuffer(stream) {
    return new Promise((resolve, reject) => {
      const chunks = [];
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('end', () => resolve(Buffer.concat(chunks)));
      stream.on('error', (err) => reject(err));
    });
  }
}

module.exports = StorageService;
