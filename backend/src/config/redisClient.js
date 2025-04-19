// Mengimpor modul redis dan dotenv untuk membaca variabel lingkungan
const redis = require('redis');
require('dotenv').config();

// Membuat koneksi ke Redis menggunakan konfigurasi dari file .env
const redisClient = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  },
  password: process.env.REDIS_PASSWORD || undefined
});

// Menangani error yang terjadi saat mencoba menghubungkan ke Redis
redisClient.on('error', (err) => console.error('Redis Client Error', err));

// Menampilkan pesan ke konsol jika Redis berhasil terhubung
redisClient.on('connect', () => console.log('Redis connected'));

// Menyambungkan Redis client
redisClient.connect();

module.exports = redisClient;