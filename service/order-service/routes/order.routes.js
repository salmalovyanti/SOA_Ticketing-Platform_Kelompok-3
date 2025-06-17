/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Pemesanan tiket
 */

const express = require('express');
const router = express.Router();
const controller = require('../controllers/order.controller');
const { authenticateToken } = require('../middleware/authMiddleware');

// Endpoint untuk membuat order
/**
 * @swagger
 * /api/order:
 *   post:
 *     summary: Buat order baru
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Order berhasil dibuat
 */
router.post('/', authenticateToken, controller.createOrder);

// Endpoint untuk menampilkan seluruh data order
/**
 * @swagger
 * /api/order:
 *   get:
 *     summary: Ambil semua order
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daftar order ditampilkan
 */
router.get('/', authenticateToken, controller.getAllOrders);

// Endpoint untuk menampilkan satu data order
/**
 * @swagger
 * /api/order/{id}:
 *   get:
 *     summary: Ambil order berdasarkan ID
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order ditemukan
 */
router.get('/:id', authenticateToken, controller.getOrderById);

// Endpoint untuk mengedit data order
/**
 * @swagger
 * /api/order/{id}:
 *   put:
 *     summary: Perbarui data order
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order diperbarui
 */
router.put('/:id', authenticateToken, controller.updateOrder);

// Endpoint untuk menghapus data order
/**
 * @swagger
 * /api/order/{id}:
 *   delete:
 *     summary: Hapus order
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order dihapus
 */
router.delete('/:id', authenticateToken, controller.deleteOrder);

// Endpoint untuk menampilkan seluruh tiket yang dibeli user
/**
 * @swagger
 * /api/order/my-tickets:
 *   get:
 *     summary: Ambil semua tiket yang dibeli user
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tiket yang dibeli ditampilkan
 */
router.get('/my-tickets', authenticateToken, controller.getMyTickets);

// Endpoint untuk mengajukan refund tiket
/**
 * @swagger
 * /api/order/request-refund:
 *   post:
 *     summary: Ajukan permintaan refund
 *     tags: [Order]
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
 *         description: Refund berhasil diajukan
 */
router.post('/request-refund', authenticateToken, controller.requestRefund);

module.exports = router;
