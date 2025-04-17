const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../config/db'); // koneksi ke database
const router = express.Router();
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'tikeroo_secret_key';
const rateLimit = require('express-rate-limit');

const saltRounds = 10;

// Fungsi untuk membuat JWT
function generateToken(user) {
    return jwt.sign(
        { user_id: user.user_id, name: user.name, email: user.email },
        SECRET_KEY,
        { expiresIn: '1h' }
    );
}

// Membuat rate limiter untuk login
const loginLimiter = rateLimit({
    // windowMs: 1,
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Terlalu banyak percakapan, silakan coba lagi setelah 15 menit.',
    statusCode: 429
});

// REGISTER (Create user)
router.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Semua field harus diisi' });
    }

    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) return res.status(500).json({ message: 'Error hashing password' });

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

// LOGIN
router.post('/login', loginLimiter, (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length === 0) {
            return res.status(400).send({ message: 'Email tidak ditemukan' });
        }

        const user = result[0];
        bcrypt.compare(password, user.password_hash, (err, isMatch) => {
            if (err) return res.status(500).send(err);
            if (!isMatch) {
                return res.status(400).send({ message: 'Password salah' });
            }

            const token = generateToken(user); // gunakan fungsi generateToken

            res.status(200).send({
                message: 'Login sukses',
                token,
                user: {
                  name: user.name,
                  email: user.email
                }
              });
                          
        });
    });
});

module.exports = router;
