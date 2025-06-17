
/**
 * @swagger
 * tags:
 *   name: Order Detail
 *   description: Detail pesanan setiap tiket
 */

const express = require('express');
const router = express.Router();
const controller = require('../controllers/order_detail.controller');
const { authenticateToken } = require('../middleware/authMiddleware');

// Endpoint untuk membuat order detail
/**
 * @swagger
 * /order-detail:
 *   post:
 *     summary: Buat detail order
 *     tags: [Order Detail]
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
 *               ticket_id:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Order detail berhasil dibuat
 */
router.post('/', authenticateToken, controller.createOrderDetail);

// Endpoint untuk menampilkan seluruh data order detail
/**
 * @swagger
 * /order-detail:
 *   get:
 *     summary: Ambil semua data order detail
 *     tags: [Order Detail]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Semua order detail ditampilkan
 */
router.get('/', authenticateToken, controller.getAllOrderDetails);

// Endpoint untuk menampilkan satu data order detail
/**
 * @swagger
 * /order-detail/{id}:
 *   get:
 *     summary: Ambil detail order berdasarkan ID
 *     tags: [Order Detail]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detail order ditemukan
 */
router.get('/:id', authenticateToken, controller.getOrderDetailById);

// Endpoint untuk mengedit data order detail
/**
 * @swagger
 * /order-detail/{id}:
 *   put:
 *     summary: Update detail order
 *     tags: [Order Detail]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Detail order diperbarui
 */
router.put('/:id', authenticateToken, controller.updateOrderDetail);

// Endpoint untuk menghapus data order detail
/**
 * @swagger
 * /order-detail/{id}:
 *   delete:
 *     summary: Hapus detail order
 *     tags: [Order Detail]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detail order dihapus
 */
router.delete('/:id', authenticateToken, controller.deleteOrderDetail);

module.exports = router;
