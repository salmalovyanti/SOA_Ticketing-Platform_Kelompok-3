// Import Sequelize dari package sequelize
const { Sequelize } = require('sequelize');
// Menggunakan dotenv untuk memuat variabel lingkungan dari file .env
require('dotenv').config();

// Membuat instance Sequelize dengan konfigurasi koneksi ke database
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
);

module.exports = sequelize;