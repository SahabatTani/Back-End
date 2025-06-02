# 🌾 Sahabat Tani - Backend API

Sahabat Tani adalah layanan backend untuk aplikasi pertanian yang menyediakan berbagai fitur seperti deteksi penyakit pada tanaman pertanian, melihat riwayat deteksi penyakit,melihat peta persebaran penyakit disekitar, pencegahan dan solusi penyakit pada tanaman serta interaksi antar petani melalui forum diskusi. Backend ini dibangun menggunakan **Node.js**, **Hapi.js**, dan **PostgreSQL**.

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

Buat file `.env` 

Isi file `.env` sesuai dengan konfigurasi lokal kamu:

```
PORT=3000
PGUSER=developer
PGHOST=localhost
PGPASSWORD=yourpassword
PGDATABASE=yourdatabase
PGPORT=5432
SUPABASE_URL=supabaseurl
SUPABASE_KEY=supabasekey
ACCESS_TOKEN_KEY=accesstokenkey
REFRESH_TOKEN_KEY=refreshtokenkey
ACCESS_TOKEN_AGE=1296000
```

### 4. Jalankan Aplikasi

```bash
npm run start
```

Aplikasi akan berjalan di `http://localhost:3000`.

---

## 🔗 Link Terkait

- 🌐 [Website](https://sahabattani.netlify.app/)
- 📄 [Dokumentasi API](sahabattani.up.railway.app/)
