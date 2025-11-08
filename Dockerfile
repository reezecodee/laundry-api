# 1. Gunakan base image Node.js (versi Alpine kecil dan cepat)
FROM node:18-alpine

# 2. Set direktori kerja di dalam kontainer
WORKDIR /usr/src/app

# 3. Salin package.json dan package-lock.json
COPY package.json package-lock.json ./

# 4. Install semua dependensi (termasuk devDependencies untuk migrasi)
RUN npm install

# 5. Salin sisa kode proyek Anda
COPY . .

# 6. (Opsional) Jika Anda butuh build TypeScript (jika start command Anda pakai 'node dist/main.js')
# RUN npm run build

# 7. Expose port yang Anda definisikan di .env
EXPOSE 3000

# 8. Command ini akan dioverride oleh docker-compose.yml
#    Namun, ini adalah default yang baik untuk menjalankan aplikasi.
CMD [ "npm", "run", "dev" ]
