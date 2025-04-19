const express = require('express');
const router = express.Router();
const wishlistController = require('./wishlist.controller');

// Endpoint untuk menambahkan event ke wishlist
router.post('/', wishlistController.addToWishlist);
// Endpoint untuk menampilkan daftar wishlist 
router.get('/', wishlistController.getMyWishlist);

module.exports = router;
