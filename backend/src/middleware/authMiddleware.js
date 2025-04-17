const jwt = require('jsonwebtoken');
const SECRET_KEY = 'tikeroo_secret_key';

// Middleware untuk autentikasi token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden

        req.user = user; // Menyimpan user info dari token
        next();
    });
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
