const express = require('express');
const router = express.Router();
const controller = require('./cart.controller');

router.post('/add', controller.addToCart);
router.get('/', controller.getMyCart);
router.post('/checkout', controller.checkout);

module.exports = router;
