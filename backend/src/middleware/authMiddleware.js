const jwt = require('jsonwebtoken');
const redisClient = require('../config/redisClient'); // pastikan file redisClient.js ada
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET || 'tikeroo_secret_key';

// Middleware untuk autentikasi token
async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401); // Unauthorized

    try {
        const decoded = jwt.verify(token, SECRET_KEY);

        // Cek apakah token masih valid di Redis
        const storedToken = await redisClient.get(decoded.email);
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
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Akses ditolak. Hanya admin yang bisa mengakses.' });
    }
    next();
}

module.exports = {
    authenticateToken,
    isAdmin
};
