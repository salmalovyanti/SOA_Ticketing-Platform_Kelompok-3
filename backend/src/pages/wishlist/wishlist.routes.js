const express = require('express');
const router = express.Router();
const wishlistController = require('./wishlist.controller');

// Fitur menambahkan event ke wishlist
router.post('/', wishlistController.addToWishlist);
// Fitur menanmpilkan daftar wishlist 
router.get('/', wishlistController.getMyWishlist);

module.exports = router;
