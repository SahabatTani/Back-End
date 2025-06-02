# 🌾 Sahabat Tani - Backend API

Sahabat Tani adalah layanan backend untuk aplikasi pertanian yang menyediakan berbagai fitur seperti manajemen produk, pengguna, dan interaksi antar petani. Backend ini dibangun menggunakan **Node.js**, **Hapi.js**, dan **PostgreSQL**.

🚀 **Production URL:**  
[https://sahabattani.up.railway.app](https://sahabattani.up.railway.app)

---

## 🛠️ Teknologi yang Digunakan

- Node.js
- Hapi.js
- PostgreSQL
- Railway (Deployment)
- dotenv (Environment Configuration)

---

## ⚙️ Persiapan & Instalasi di Lokal

Ikuti langkah-langkah berikut untuk menjalankan project ini di lokal (port default: **3000**):

### 1. Clone Repositori

```bash
git clone https://github.com/username/sahabat-tani-backend.git
cd sahabat-tani-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Konfigurasi Environment Variables

Buat file `.env` berdasarkan `.env.example`:

```bash
cp .env.example .env
```

Isi file `.env` sesuai dengan konfigurasi lokal kamu:

```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=sahabat_tani_db
JWT_SECRET=your_jwt_secret
```

### 4. Setup Database

Pastikan PostgreSQL sudah berjalan, lalu jalankan migrasi dan seeding (jika tersedia):

```bash
npx sequelize db:create
npx sequelize db:migrate
npx sequelize db:seed:all
```

### 5. Jalankan Aplikasi

```bash
npm run start
```

Aplikasi akan berjalan di `http://localhost:3000`.

---

## 🔗 Link Terkait

- 🌐 [Website](https://sahabattani.netlify.app/)
- 📄 [Dokumentasi API](sahabattani.up.railway.app/)
