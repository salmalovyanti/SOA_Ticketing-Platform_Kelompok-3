const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlist.controller');
const { authenticateToken } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: Fitur wishlist event
 */

// Endpoint untuk menambahkan event ke wishlist
/**
 * @swagger
 * /api/wishlist:
 *   post:
 *     summary: Tambah event ke wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               event_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Wishlist ditambahkan
 */
router.post('/', authenticateToken, wishlistController.addToWishlist);


// Endpoint untuk menampilkan daftar wishlist 
/**
 * @swagger
 * /api/wishlist:
 *   get:
 *     summary: Ambil semua wishlist pengguna
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daftar wishlist
 */
router.get('/', authenticateToken, wishlistController.getMyWishlist);

module.exports = router;