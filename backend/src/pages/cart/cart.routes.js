const express = require('express');
const router = express.Router();
const controller = require('./cart.controller');

// Fitur menambahkan tiket ke keranjang
router.post('/add', controller.addToCart);
// Fitur melihat isi keranjang user
router.get('/', controller.getMyCart);
// Fitur checkout isi keranjang dan membuat order
router.post('/checkout', controller.checkout);

module.exports = router;
