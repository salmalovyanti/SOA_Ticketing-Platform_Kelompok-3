/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: Pembayaran dan pembatalan tiket
 */

const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');
const { authenticateToken } = require('../middleware/authMiddleware');

// Endpoint untuk membatalkan pembelian tiket
/**
 * @swagger
 * /api/payment/cancel-ticket:
 *   post:
 *     summary: Batalkan pembelian tiket
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order_id:
 *                 type: integer
 *               reason:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tiket berhasil dibatalkan
 */
router.post('/cancel-ticket', authenticateToken, paymentController.cancelTicket);

module.exports = router;
