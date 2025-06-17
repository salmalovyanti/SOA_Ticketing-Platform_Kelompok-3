


/** 
 * @swagger
 * tags:
 *   name: Cart
 *   description: Fitur keranjang tiket
 */

const express = require('express');
const router = express.Router();
const controller = require('../controllers/cart.controller');
const { authenticateToken } = require('../middleware/authMiddleware');

// Endpoint untuk menambahkan tiket ke keranjang
/**
 * @swagger
 * /api/cart/add:
 *   post:
 *     summary: Tambahkan tiket ke keranjang
 *     tags: [Cart]
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
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Tiket ditambahkan ke keranjang
 */
router.post('/add', authenticateToken, controller.addToCart);

// Endpoint untuk melihat isi keranjang user
/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Lihat isi keranjang user
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daftar isi keranjang
 */
router.get('/', authenticateToken, controller.getMyCart);

// Endpoint untuk checkout isi keranjang dan membuat order
/**
 * @swagger
 * /api/cart/checkout:
 *   post:
 *     summary: Checkout isi keranjang dan buat order
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Checkout berhasil dan order dibuat
 */
router.post('/checkout', authenticateToken, controller.checkout);

module.exports = router;
