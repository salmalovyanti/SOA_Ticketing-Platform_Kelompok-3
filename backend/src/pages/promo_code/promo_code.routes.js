const express = require('express');
const router = express.Router();
const controller = require('./promo_code.controller');

// POST /api/promo-codes
router.post('/', controller.createPromoCode);
// POST /api/redeem-promo
router.post('/redeem-promo', controller.redeemPromo);

module.exports = router;
