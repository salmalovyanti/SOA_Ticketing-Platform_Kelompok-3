const express = require('express');
const router = express.Router();
const controller = require('./promo_code.controller');
const { authenticateToken } = require('../../middleware/authMiddleware');

// Endpoint untuk menambahkan kode promo
router.post('/', authenticateToken, controller.createPromoCode);
// Endpoint untuk menggunakan kode promo saat melakukan pembelian
router.post('/redeem-promo', authenticateToken, controller.redeemPromo);

module.exports = router;
