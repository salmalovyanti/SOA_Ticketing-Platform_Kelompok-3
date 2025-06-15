// Import library yang dibutuhkan
const jwt = require('jsonwebtoken');
const redisClient = require('../config/redisClient'); // pastikan file redisClient.js ada
require('dotenv').config();

// Gunakan secret dari .env, atau fallback ke default
const SECRET_KEY = process.env.JWT_SECRET || 'tikeroo_secret_key';

// Middleware untuk autentikasi token
async function authenticateToken(req, res, next) {
    // Ambil token dari header Authorization (format: Bearer <token>)
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // Jika tidak ada token, kembalikan 401 Unauthorized
    if (!token) return res.sendStatus(401); // Unauthorized

    try {
        // Verifikasi token menggunakan secret key
        const decoded = jwt.verify(token, SECRET_KEY);

        // Cek apakah token masih valid di Redis
        const storedToken = await redisClient.get(decoded.email);
        // Jika token tidak cocok atau sudah dihapus, beri status 403 Forbidden
        if (!storedToken || storedToken !== token) {
            return res.status(403).json({ message: 'Token tidak valid atau sudah logout' });
        }

        req.user = decoded; // Menyimpan info user dari token
        next();
    } catch (err) {
        return res.sendStatus(403); // Forbidden
    }
}

// Middleware untuk memastikan user adalah admin
function isAdmin(req, res, next) {
    // Cek apakah role user adalah admin
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Akses ditolak. Hanya admin yang bisa mengakses.' });
    }
    next(); // Jika admin, lanjut ke middleware berikutnya
}

module.exports = {
    authenticateToken,
    isAdmin
};
