// Mengimpor modul mysql untuk mengelola koneksi database MySQL
const mysql = require('mysql');
// Mengimpor modul dotenv untuk mengakses variabel lingkungan dari file .env
const dotenv = require('dotenv');

// Memuat konfigurasi variabel lingkungan dari file .env
dotenv.config();

// Membuat koneksi ke database menggunakan konfigurasi yang diambil dari file .env
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Menghubungkan ke database dan menangani jika terjadi error atau berhasil
db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ', err);
    } else {
        console.log('Connected to database');
    }
});

module.exports = db;
