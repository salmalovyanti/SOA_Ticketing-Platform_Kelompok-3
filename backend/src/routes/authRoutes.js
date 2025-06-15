// Mengimpor library yang dibutuhkan
const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../config/db'); // koneksi ke database
const router = express.Router();
const jwt = require('jsonwebtoken');
const redisClient = require('../config/redisClient'); // Tambahkan ini
const rateLimit = require('express-rate-limit');
require('dotenv').config()

const SECRET_KEY = process.env.JWT_SECRET || 'tikeroo_secret_key';

const saltRounds = 10; // Jumlah salt rounds untuk bcrypt saat hashing password

// Fungsi untuk membuat JWT token berdasarkan user_id dan email
function generateToken(user) {
    return jwt.sign(
        { user_id: user.user_id, email: user.email },
        SECRET_KEY,
        { expiresIn: '1h' }
    );
}

// Membuat rate limiter untuk login
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Terlalu banyak percakapan, silakan coba lagi setelah 15 menit.',
    statusCode: 429
});

// REGISTER (Create user)
router.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    // Validasi: semua field wajib diisi
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Semua field harus diisi' });
    }

    // Hash password sebelum disimpan ke database
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) return res.status(500).json({ message: 'Error hashing password' });

        // Query untuk insert user baru ke tabel users
        const sql = `INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)`;
        db.query(sql, [name, email, hashedPassword], (err, result) => {
            if (err) return res.status(500).json({ message: 'Gagal registrasi', error: err });
            
            // Jika berhasil, kirim response user_id, name, dan email
            res.status(201).json({
                message: 'Registrasi berhasil',
                user: { user_id: result.insertId, name, email }
            });
        });
    });
});

// LOGIN
router.post('/login', loginLimiter, async (req, res) => {
    const { email, password } = req.body;

    // Query untuk mencari user berdasarkan email
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], async (err, result) => {
        if (err) return res.status(500).send(err);

        // Jika user tidak ditemukan berdasarkan email
        if (result.length === 0) {
            return res.status(400).send({ message: 'Email tidak ditemukan' });
        }

        const user = result[0];

        // Bandingkan password yang diinput dengan hash di database
        const isMatch = await bcrypt.compare(password, user.password_hash);
        // Jika password tidak cocok
        if (!isMatch) {
            return res.status(400).send({ message: 'Password salah' });
        }

        // Jika cocok, buat JWT token
        const token = generateToken(user);

        // ✅ SIMPAN TOKEN KE REDIS
        await redisClient.set(user.email, token);

        res.status(200).send({
            message: 'Login sukses',
            token,
            user: {
                user_id: user.user_id,
                name: user.name,
                email: user.email
            }
        });

        // // Bandingkan password yang diinput dengan hash di database
        // bcrypt.compare(password, user.password_hash, (err, isMatch) => {
        //     if (err) return res.status(500).send(err);

        //     // Jika password tidak cocok
        //     if (!isMatch) {
        //         return res.status(400).send({ message: 'Password salah' });
        //     }

        //     // Jika cocok, buat JWT token
        //     const token = generateToken(user); // gunakan fungsi generateToken
            

        //     res.status(200).send({
        //         message: 'Login sukses',
        //         token,
        //         user: {
        //             user_id: user.user_id,
        //             name: user.name,
        //             email: user.email
        //         }
        //     });
        // });
    });
});

module.exports = router;
