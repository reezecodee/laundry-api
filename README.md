## Laundry API

Ini adalah API backend untuk aplikasi laundry, dibangun dengan Node.js, Express, TypeScript, PostgreSQL, dan TypeORM.

Proyek ini mencakup otentikasi JWT (Access/Refresh Token) yang aman, konfigurasi Docker untuk development dan produksi (multi-stage), dan pm2 untuk manajemen proses di produksi.

### 🛠️ Prasyarat

Sebelum memulai, pastikan Anda memiliki software berikut di mesin Anda:

<ul>
    <li>Node.js (v18 atau lebih baru)</li>
    <li>Docker & Docker Compose</li>
    <li>mkcert (Untuk membuat sertifikat SSL lokal yang tepercaya)</li>
</ul>

Instalasi mkcert (Wajib untuk HTTPS Lokal)
Lingkungan development aplikasi ini berjalan di HTTPS untuk meniru produksi dan mengaktifkan cookie `Secure`.

1. Instal mkcert. Contoh di Windows (jalankan di PowerShell sebagai Administrator):

```bash
choco install mkcert
```

2. Instal Otoritas Sertifikat (CA) lokal. (Juga di terminal Administrator):

```bash
mkcert -install
```

Anda hanya perlu melakukan ini satu kali saja di komputer Anda.

### 🗝️ Generate Access dan Refresh Token

Jalankan dua kali perintah di bawah ini untuk mendapatkan access token dan refresh token, pastekan masing-masing ke env `ACCESS_TOKEN_SECRET` dan `REFRESH_TOKEN_SECRET`. Gunakan access dan refresh secret token yang sulit ditebak untuk menghasilkan keamanan yang optimal, semakin panjang dan sulit ditebak semakin aman pula kemanannya.

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 🚀 Setup & Menjalankan (Development)

Ini adalah cara yang direkomendasikan untuk menjalankan aplikasi di lingkungan development Anda menggunakan Docker.

1. Clone repositori ini:

```bash
git clone https://github.com/reezecodee/laundry-api.git

cd laundry-api

code .
```

2. Instal dependensi (ini penting agar VS Code mengenali type):

```bash
npm install
```

3. Konfigurasi Environment (.env)
   Buat file .env di root proyek. (Anda bisa menyalin dari .env.example).
   Isi file tersebut dengan kredensial Anda. Pastikan NODE_ENV diatur ke development.

```bash
NODE_ENV=development
LOG_LEVEL=info
PORT=3000
DB_HOST=db
DB_PORT=5432
POSTGRES_USER=root
POSTGRES_PASSWORD=
POSTGRES_DB=
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
```

4. Buat Sertifikat SSL Lokal
   `index.ts` dikonfigurasi untuk mencari localhost-key.pem dan localhost.pem di root proyek.
   Jalankan `mkcert` di root proyek Anda:

```bash
mkcert localhost 127.0.0.1 ::1
```

Ini akan membuat dua file (`localhost-key.pem` dan `localhost.pem`).
Pastikan Anda telah menambahkan `*.pem` ke file `.gitignore` Anda!

5. Jalankan dengan Docker Compose
   Perintah ini akan membaca `docker-compose.yml`, membangun image api (menggunakan `Dockerfile`), menjalankan kontainer `api` dan `db`, serta memasang volume untuk hot-reloading.

```bash
docker-compose up -d --build
```

- Server API Anda akan berjalan di https://localhost:3000.
- Database Postgres akan dapat diakses dari localhost:5433.

### 📦 Deployment (Produksi)

Untuk produksi, kita menggunakan `Dockerfile.prod` (multi-stage build) yang meng-compile TypeScript, menginstal hanya `dependencies` produksi, dan menggunakan `pm2` untuk menjalankan aplikasi.

1. Konfigurasi `package.json`
   Pastikan package.json Anda memiliki pm2 di dependencies dan skrip berikut:

```json
{
  "scripts": {
    "prod": "pm2-runtime start dist/index.js -i max",
    "build": "tsc",
    "dev": "ts-node-dev src/index.ts"
  },
  "dependencies": {
    "pm2": "^5.3.1",
    "express": "...",
    "cors": "..."
    // ...dependensi produksi lainnya
  },
  "devDependencies": {
    "typescript": "...",
    "ts-node-dev": "..."
    // ...devDependencies lainnya
  }
}
```

2. Bangun (Build) Image Produksi
   Perintah ini akan menggunakan Dockerfile.prod untuk membuat image produksi yang bersih dan ringan.

```bash
# -f menunjuk ke Dockerfile produksi
# -t memberi nama (tag) pada image Anda (ganti 'laundry_api:latest')
docker build -f Dockerfile.prod -t laundry_api:latest .
```

3. Menjalankan Kontainer Produksi
   Setelah image di-build, jalankan sebagai kontainer. Anda perlu menyediakan file .env produksi.

```bash
docker run -d \
  -p 3000:3000 \
  --env-file ./.env.production \
  --name laundry_api_prod \
  laundry_api:latest
```

- `--env-file ./.env.production`: Memuat variabel lingkungan dari file `.env.production`.
  Perintah ini akan menjalankan `npm prod`, yang akan memanggil `pm2-runtime` dan menjalankan aplikasi Anda di semua core CPU yang tersedia (`-i max`).

### 📜 Perintah NPM Penting

- `npm install` Untuk instalasi development. Menginstal semua dependensi (`dependencies` dan `devDependencies`).
- `npm ci` Untuk instalasi bersih di server. Membaca `package-lock.json` untuk memastikan build yang konsisten.
- `npm ci --omit=dev` Perintah ini digunakan di dalam `Dockerfile.prod`. Ini akan menginstal hanya `dependencies` (produksi) dan melewatkan semua `devDependencies` untuk menjaga image tetap ringan dan aman.
- `npm run dev` Menjalankan server development dengan `ts-node-dev` (hot-reload).
- `npm run build` Meng-compile kode TypeScript (`.ts`) di `src/` menjadi JavaScript (`.js`) di `dist/`.
- `npm prod` Menjalankan aplikasi produksi yang sudah di-build (dari `dist/`) menggunakan `pm2-runtime`.
