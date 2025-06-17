/**
 * @swagger
 * tags:
 *   name: Ticket
 *   description: Manajemen tiket event
 */

const express = require('express');
const router = express.Router();
const controller = require('../controllers/ticket.controller');
const { validateBulkUploadTickets } = require('../validations/ticket.validations');
const { authenticateToken } = require('../middleware/authMiddleware');

// Endpoint untuk scan tiket barcode
/**
 * @swagger
 * /api/ticket/scan-ticket:
 *   get:
 *     summary: Scan tiket menggunakan barcode
 *     tags: [Ticket]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tiket berhasil discan
 */
router.get('/scan-ticket', authenticateToken, controller.scanTicket);

// Endpoint untuk menambahkan jenis tiket ke event
/**
 * @swagger
 * /api/ticket:
 *   post:
 *     summary: Tambah jenis tiket ke event
 *     tags: [Ticket]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Tiket berhasil ditambahkan
 */
router.post('/', authenticateToken, controller.createTicket);

// Endpoint untuk menampilkan seluruh data tiket
/**
 * @swagger
 * /api/ticket:
 *   get:
 *     summary: Ambil semua tiket
 *     tags: [Ticket]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daftar semua tiket
 */
router.get('/', authenticateToken, controller.getAllTickets);

// Endpoint untuk menampilkan satu data tiket
/**
 * @swagger
 * /api/ticket/{id}:
 *   get:
 *     summary: Ambil detail tiket berdasarkan ID
 *     tags: [Ticket]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Detail tiket
 */
router.get('/:id', authenticateToken, controller.getTicketById);

// Endpoint untuk mengedit data tiket
/**
 * @swagger
 * /api/ticket/{id}:
 *   put:
 *     summary: Update data tiket
 *     tags: [Ticket]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Tiket berhasil diupdate
 */
router.put('/:id', authenticateToken, controller.updateTicket);

// Endpoint untuk menghapus data tiket
/**
 * @swagger
 * /api/ticket/{id}:
 *   delete:
 *     summary: Hapus data tiket
 *     tags: [Ticket]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Tiket berhasil dihapus
 */
router.delete('/:id', authenticateToken, controller.deleteTicket);

// Endpoint untuk membeli tiket
/**
 * @swagger
 * /api/ticket/purchase-ticket:
 *   post:
 *     summary: Beli tiket
 *     tags: [Ticket]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Pembelian tiket berhasil
 */
router.post('/purchase-ticket', authenticateToken, controller.purchaseTicket);

// Endpoint untuk upload tiket secara massal
/**
 * @swagger
 * /api/ticket/bulk-upload:
 *   post:
 *     summary: Upload tiket secara massal
 *     tags: [Ticket]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tiket berhasil diupload secara massal
 */
router.post('/bulk-upload', authenticateToken, validateBulkUploadTickets, controller.bulkUploadTickets);

module.exports = router;
