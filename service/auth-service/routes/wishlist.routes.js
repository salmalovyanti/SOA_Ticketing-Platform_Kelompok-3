const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlist.controller');
const { authenticateToken } = require('../middleware/authMiddleware');

// Endpoint untuk menambahkan event ke wishlist
router.post('/', authenticateToken, wishlistController.addToWishlist);
// Endpoint untuk menampilkan daftar wishlist 
router.get('/', authenticateToken, wishlistController.getMyWishlist);

module.exports = router;