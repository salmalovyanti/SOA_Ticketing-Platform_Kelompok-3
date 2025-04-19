const express = require('express');
const router = express.Router();
const controller = require('./cart.controller');

// Endpoint untuk menambahkan tiket ke keranjang
router.post('/add', controller.addToCart);
// Endpoint untuk melihat isi keranjang user
router.get('/', controller.getMyCart);
// Endpoint untuk checkout isi keranjang dan membuat order
router.post('/checkout', controller.checkout);

module.exports = router;
