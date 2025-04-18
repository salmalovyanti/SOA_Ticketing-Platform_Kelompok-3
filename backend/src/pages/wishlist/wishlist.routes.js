const express = require('express');
const router = express.Router();
const wishlistController = require('./wishlist.controller');

router.post('/wishlist', wishlistController.addToWishlist); // Add event to wishlist
router.get('/wishlist', wishlistController.getMyWishlist); // Get user's wishlist

module.exports = router;
