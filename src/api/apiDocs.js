/* eslint-disable arrow-body-style */
const routes = [
  {
    method: 'GET',
    path: '/',
    handler: () => {
      return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sahabat Tani API Documentation</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f5f7fa;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 1000px;
      margin: 50px auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      padding-bottom: 20px;
      border-bottom: 1px solid #ddd;
    }
    .header h1 {
      margin: 0;
      font-size: 2rem;
      color: #333333;
    }
    .route {
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 1px solid #eee;
    }
    .route:last-child {
      border-bottom: none;
    }
    .route h2 {
      margin-bottom: 10px;
      font-size: 1.5rem;
      color: #0066cc;
    }
    .route p {
      margin-bottom: 10px;
      font-size: 1rem;
      color: #555555;
    }
    .route pre {
      background-color: #f0f4f8;
      padding: 15px;
      border-radius: 5px;
      overflow-x: auto;
      font-size: 0.9rem;
      color: #333333;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      font-size: 0.9rem;
      color: #888888;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Sahabat Tani API Documentation</h1>
      <div class="base-url">Base URL: <code>https://sahabattani.up.railway.app/</code></div>
    </div>

    <div class="route">
      <h2>POST /users</h2>
      <p>Menambahkan user baru.</p>
      <strong>Request:</strong>
      <pre>{
  "username": "string",
  "email": "string",
  "password": "string",
  "fullname": "string"
}</pre>
      <strong>Response:</strong>
      <pre>{
    "status": "success",
    "message": "User berhasil ditambahkan",
    "data": {
        "user": {
            "username": "broxy",
            "email": "broxy@gmail.com",
            "fullname": "John Doe"
        },
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXItMDdsN3otekFkWHBkbEVCYSIsImlhdCI6MTc0NzQ1NDg3MX0.YZTfZbJF32JYvJ4i5uRcJrmqykMsrGOohGT8KS5AVBw",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXItMDdsN3otekFkWHBkbEVCYSIsImlhdCI6MTc0NzQ1NDg3MX0.xmTDoIc31RjdNaEiw5alyXugMUPVJXgwXNREPOnhfo4"
    }
}</pre>
    </div>

    <div class="route">
      <h2>GET /users</h2>
      <p>Mengambil detail user menggunakan access token</p>
      <strong>Headers:</strong>
      <pre>
Authorization: Bearer &lt;accessToken&gt;
Content-Type: multipart/form-data
      </pre>
      <strong>Response:</strong>
      <pre>{
    "status": "success",
    "data": {
        "user": {
            "username": "brox",
            "email": "brox@gmail.com",
            "fullname": "John Doe"
        }
    }
}</pre>
    </div>

    <div class="route">
      <h2>POST /authentications</h2>
      <p>Login untuk mendapatkan access token dan refresh token.</p>
      <strong>Request:</strong>
      <pre>{
  "identifier": "string",
  "password": "string"
}</pre>
      <strong>Response:</strong>
      <pre>{
  "status": "success",
  "message": "Authentication berhasil ditambahkan",
  "data": {
    "accessToken": "string",
    "refreshToken": "string"
  }
}</pre>
    </div>

    <div class="route">
      <h2>PUT /authentications</h2>
      <p>Memperbarui access token dengan refresh token.</p>
      <strong>Request:</strong>
      <pre>{
  "refreshToken": "string"
}</pre>
      <strong>Response:</strong>
      <pre>{
  "status": "success",
  "message": "Access token berhasil diperbarui",
  "data": {
    "accessToken": "string"
  }
}</pre>
    </div>

    <div class="route">
      <h2>DELETE /authentications</h2>
      <p>Menghapus refresh token.</p>
      <strong>Request:</strong>
      <pre>{
  "refreshToken": "string"
}</pre>
      <strong>Response:</strong>
      <pre>{
  "status": "success",
  "message": "Refresh token berhasil dihapus"
}</pre>
    </div>

    <div class="route">
      <h2>POST /threads</h2>
      <p>Menambahkan thread baru dengan opsi upload gambar.</p>
      <strong>Headers:</strong>
      <pre>
Authorization: Bearer &lt;accessToken&gt;
Content-Type: multipart/form-data
      </pre>
      <strong>Request:</strong>
      <pre>{
  "title": "string",
  "content": "string",
  "file": "image/jpeg or image/png (optional)"
}</pre>
      <strong>Response:</strong>
      <pre>{
  "status": "success",
  "message": "Threads berhasil ditambahkan",
  "data": {
    "threadId": "thread-123"
  }
}</pre>
    </div>

    <div class="route">
      <h2>GET /threads</h2>
      <p>Mendapatkan semua threads</p>
      <strong>Response:</strong>
      <pre>{
  "status": "success",
  "data": {
    "threads": [
            {
                "id": "threads-nyJ-BbqBMhXHi2m-",
                "fullname": "John Doe",
                "title": "TESSUPABASE",
                "content": "TES",
                "created_at": "2025-05-16T01:25:17.854Z",
                "image_url": "https://rupjluzedowyokazodad.supabase.co/storage/v1/object/public/images/threads/1747358716841_user-td2T-hU6BUuW5z8i_picture-small.jpg",
                "total_comments": "0"
            }
        ]
  }
}</pre>
    </div>

    <div class="route">
      <h2>GET /threads/{threadId}</h2>
      <p>Mendapatkan threads berdasarkarkan id thread</p>
      <strong>Response:</strong>
      <pre>{
  "status": "success",
  "data": {
    "threads": [
            {
                "id": "threads-nyJ-BbqBMhXHi2m-",
                "fullname": "John Doe",
                "title": "TESSUPABASE",
                "content": "TES",
                "created_at": "2025-05-16T01:25:17.854Z",
                "image_url": "https://rupjluzedowyokazodad.supabase.co/storage/v1/object/public/images/threads/1747358716841_user-td2T-hU6BUuW5z8i_picture-small.jpg",
                "comments": [
                  {
                        "id": "comment-p-T7gg3Kolq4fJRz",
                        "fullname": "John Doe",
                        "content": "TES",
                        "image_url": "https://rupjluzedowyokazodad.supabase.co/storage/v1/object/public/images/comments/1747358982867_user-td2T-hU6BUuW5z8i_picture-small.jpg",
                        "created_at": "2025-05-16T01:29:44.328Z"
                    }
                ]
            }
        ]
  }
}</pre>
    </div>

    <div class="route">
      <h2>GET /threads/search/{keyword}</h2>
      <p>Mendapatkan semua threads berdasarkan keyword</p>
      <strong>Response:</strong>
      <pre>{
  "status": "success",
  "data": {
    "threads": [
            {
                "id": "threads-nyJ-BbqBMhXHi2m-",
                "fullname": "John Doe",
                "title": "TESSUPABASE",
                "content": "TES",
                "created_at": "2025-05-16T01:25:17.854Z",
                "image_url": "https://rupjluzedowyokazodad.supabase.co/storage/v1/object/public/images/threads/1747358716841_user-td2T-hU6BUuW5z8i_picture-small.jpg",
                "comments": [
                  {
                        "id": "comment-p-T7gg3Kolq4fJRz",
                        "fullname": "John Doe",
                        "content": "TES",
                        "image_url": "https://rupjluzedowyokazodad.supabase.co/storage/v1/object/public/images/comments/1747358982867_user-td2T-hU6BUuW5z8i_picture-small.jpg",
                        "created_at": "2025-05-16T01:29:44.328Z"
                    }
                ]
            }
        ]
  }
}</pre>
    </div>

    <div class="route">
      <h2>DELETE /threads/{threadId}</h2>
      <p>Menghapus thread berdasasarkan id.</p>
      <strong>Headers:</strong>
      <pre>
Authorization: Bearer &lt;accessToken&gt;
Content-Type: multipart/form-data
      </pre>
      <strong>Response:</strong>
      <pre>{
  "status": "success",
  "message": "Thread berhasil dihapus",
}</pre>
    </div>

    <div class="route">
      <h2>POST /comments/{threadId}</h2>
      <p>Menambahkan komentar ke dalam sebuah thread. Bisa menyertakan gambar opsional.</p>
      <strong>Headers:</strong>
      <pre>
Authorization: Bearer &lt;accessToken&gt;
Content-Type: multipart/form-data
      </pre>
      <strong>Request:</strong>
      <pre>{
  "content": "string",
  "file": "image/jpeg or image/png (optional)"
}</pre>
      <strong>Response:</strong>
      <pre>{
  "status": "success",
  "message": "Comments berhasil ditambahkan",
  "data": {
    "commentId": "comment-123"
  }
}</pre>
    </div>

    <div class="route">
      <h2>DELETE /comments/{commentId}</h2>
      <p>Menghapus komentar berdasarkan ID.</p>
      <strong>Headers:</strong>
      <pre>
Authorization: Bearer &lt;accessToken&gt;
      </pre>
      <strong>Response:</strong>
      <pre>{
  "status": "success",
  "message": "Comments berhasil dihapus"
}</pre>
    </div>

    <div class="footer">
      &copy; 2025 Sahabat Tani API Documentation
    </div>
  </div>
</body>
</html>
      `;
    },
  },
];

module.exports = routes;
