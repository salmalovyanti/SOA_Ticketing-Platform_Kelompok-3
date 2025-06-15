const express = require('express');
const router = express.Router();
const controller = require('../controllers/cart.controller');
const { authenticateToken } = require('../../middleware/authMiddleware');

// Endpoint untuk menambahkan tiket ke keranjang
router.post('/add', authenticateToken, controller.addToCart);
// Endpoint untuk melihat isi keranjang user
router.get('/', authenticateToken, controller.getMyCart);
// Endpoint untuk checkout isi keranjang dan membuat order
router.post('/checkout', authenticateToken, controller.checkout);

module.exports = router;