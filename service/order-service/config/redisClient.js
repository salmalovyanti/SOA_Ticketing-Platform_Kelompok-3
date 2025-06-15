// Mengimpor modul redis dan dotenv untuk membaca variabel lingkungan
const redis = require('redis');
require('dotenv').config();

// Membuat koneksi ke Redis menggunakan konfigurasi dari file .env
const redisClient = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    connectTimeout: 10000,
  },
  password: process.env.REDIS_PASSWORD || undefined
});

// Menangani error yang terjadi saat mencoba menghubungkan ke Redis
redisClient.on('error', (err) => {
  if (err.name === 'ConnectionTimeoutError') {
    console.warn('Redis timeout, will retry...');
  } else {
    console.error('Redis Client Error:', err);
  }
});

// Connect Redis
(async () => {
  try {
    await redisClient.connect();
    console.log('✅ Redis connected');
  } catch (err) {
    console.error('❌ Failed to connect to Redis:', err);
  }
})();

module.exports = redisClient;