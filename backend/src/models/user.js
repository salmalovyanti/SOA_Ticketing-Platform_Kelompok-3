// Mengimpor koneksi database dari file konfigurasi
const db = require('../config/db');

module.exports = {
  // Fungsi untuk mencari user berdasarkan google_id
  findByGoogleId: (googleId, callback) => {
    const query = 'SELECT * FROM users WHERE google_id = ?';
    db.query(query, [googleId], (err, results) => {
      if (err) return callback(err, null);
      return callback(null, results[0]);
    });
  },

  // Fungsi untuk membuat user baru dari data akun Google
  createUserFromGoogle: (profile, callback) => {
    const query = 'INSERT INTO users (name, email, google_id) VALUES (?, ?, ?)';
    const values = [profile.displayName, profile.emails[0].value, profile.id];
    db.query(query, values, (err, result) => {
      if (err) return callback(err, null);
      return callback(null, {
        id: result.insertId,
        name: profile.displayName,
        email: profile.emails[0].value,
        google_id: profile.id
      });
    });
  }
};
