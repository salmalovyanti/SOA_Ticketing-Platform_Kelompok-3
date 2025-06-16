// Mengimpor koneksi ke database (Sequelize instance)
const sequelize = require('../config/database');

// Mengimpor semua model yang digunakan di aplikasi
const Payment = require('../models/payment.model');

// Mengekspor semua model dan instance Sequelize agar bisa digunakan di file lain
module.exports = {
  Payment,
};