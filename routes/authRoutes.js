const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db'); // koneksi ke database
const router = express.Router();
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'tikeroo_secret_key';
const rateLimit = require('express-rate-limit');


const saltRounds = 10;
// Membuat rate limiter untuk login (misalnya 5 percakapan per 15 menit)
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 menit
    max: 5, // maksimal 5 permintaan
    message: 'Terlalu banyak percakapan, silakan coba lagi setelah 15 menit.',
    statusCode: 429 // Kode status untuk terlalu banyak permintaan
});


// REGISTER (Create user)
router.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    // Validasi sederhana
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Semua field harus diisi' });
    }

    // Hash password dulu
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) return res.status(500).json({ message: 'Error hashing password' });

        // Masukkan ke database
        const sql = `INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)`;
        db.query(sql, [name, email, hashedPassword], (err, result) => {
            if (err) return res.status(500).json({ message: 'Gagal registrasi', error: err });
            res.status(201).json({
                message: 'Registrasi berhasil',
                user: { user_id: result.insertId, name, email }
            });
        });
    });
});

module.exports = router;

// POST login dengan rate limiter
router.post('/login', loginLimiter, (req, res) => {
    const { email, password } = req.body;

    // Cek apakah email ada di database
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length === 0) {
            return res.status(400).send({ message: 'Email tidak ditemukan' });
        }

        // Verifikasi password
        const user = result[0];
        bcrypt.compare(password, user.password_hash, (err, isMatch) => {
            if (err) return res.status(500).send(err);
            if (!isMatch) {
                return res.status(400).send({ message: 'Password salah' });
            }

            // Buat token JWT
            const token = jwt.sign({ user_id: user.user_id, email: user.email }, 'secret_key', { expiresIn: '1h' });

            // Kirim response dengan token
            res.status(200).send({ message: 'Login sukses', token });
        });
    });
});

module.exports = router;