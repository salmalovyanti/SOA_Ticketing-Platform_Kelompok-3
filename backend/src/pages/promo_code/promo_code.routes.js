const express = require('express');
const router = express.Router();
const controller = require('./promo_code.controller');

// Endpoint untuk menambahkan kode promo
router.post('/', controller.createPromoCode);
// Endpoint untuk menggunakan kode promo saat melakukan pembelian
router.post('/redeem-promo', controller.redeemPromo);

module.exports = router;
