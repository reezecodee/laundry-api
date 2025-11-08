import dotenv from "dotenv";
dotenv.config(); 

import app from "./app"; 
import https from "https";
import fs from "fs";
import path from "path";

const port = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === "production";

if (isProduction) {
  // --- MODE PRODUKSI ---
  // Jalankan server HTTP biasa. Reverse Proxy (Nginx/Hosting) akan menangani HTTPS.
  app.listen(port, () => {
    console.log(`Server produksi berjalan di http://localhost:${port}`);
  });
} else {
  // --- MODE DEVELOPMENT ---
  // Jalankan server HTTPS menggunakan sertifikat mkcert palsu
  console.log("Menjalankan server dalam mode development (HTTPS)...");
  try {
    const keyPath = path.join(__dirname, "..", "localhost-key.pem");
    const certPath = path.join(__dirname, "..", "localhost.pem");

    const options = {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    };

    https.createServer(options, app).listen(port, () => {
      console.log(`Server development berjalan di https://localhost:${port}`);
    });
  } catch (err) {
    console.error(
      "\n❌ Gagal menjalankan server HTTPS. ❌" +
        "\nPastikan file 'localhost-key.pem' dan 'localhost.pem' ada di folder root proyek Anda." +
        "\nJalankan 'mkcert localhost 127.0.0.1 ::1' jika belum.\n",
      err
    );
  }
}