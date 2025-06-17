/** 
 * @swagger
 * tags:
 *   name: Promo Code
 *   description: Manajemen dan penggunaan kode promo
 */

const express = require('express');
const router = express.Router();
const controller = require('../controllers/promo_code.controller');
const { authenticateToken } = require('../middleware/authMiddleware');
// Endpoint untuk menambahkan kode promo
/**
 * @swagger
 * /promo-code:
 *   post:
 *     summary: Tambahkan kode promo baru
 *     tags: [Promo Code]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               discount:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Promo code berhasil ditambahkan
 */
router.post('/', authenticateToken, controller.createPromoCode);

// Endpoint untuk menggunakan kode promo saat melakukan pembelian
/**
 * @swagger
 * /promo-code/redeem-promo:
 *   post:
 *     summary: Gunakan kode promo saat pembelian
 *     tags: [Promo Code]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *     responses:
 *       200:
 *         description: Promo code berhasil digunakan
 */
router.post('/redeem-promo', authenticateToken, controller.redeemPromo);

module.exports = router;
