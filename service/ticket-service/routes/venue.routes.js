/**
 * @swagger
 * tags:
 *   name: Venue
 *   description: Manajemen venue event
 */

const express = require('express');
const router = express.Router();
const controller = require('../controllers/venue.controller');
const { authenticateToken } = require('../middleware/authMiddleware');

// Endpoint untuk menampilkan seluruh data venue
/**
 * @swagger
 * /venue:
 *   get:
 *     summary: Ambil semua data venue
 *     tags: [Venue]
 *     responses:
 *       200:
 *         description: Semua venue berhasil ditampilkan
 */
router.get('/', controller.getAllVenues);

// Endpoint untuk menambahkan data venue
/**
 * @swagger
 * /venue:
 *   post:
 *     summary: Tambah data venue
 *     tags: [Venue]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Venue berhasil ditambahkan
 */
router.post('/', authenticateToken, controller.createVenue);

// Endpoint untuk menampilkan satu data venue
/**
 * @swagger
 * /venue/{id}:
 *   get:
 *     summary: Ambil venue berdasarkan ID
 *     tags: [Venue]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Venue ditemukan
 */
router.get('/:id', controller.getVenueById);

// Endpoint untuk mengedit data venue
/**
 * @swagger
 * /venue/{id}:
 *   put:
 *     summary: Update venue
 *     tags: [Venue]
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
 *         description: Venue berhasil diupdate
 */
router.put('/:id', authenticateToken, controller.updateVenue);

// Endpoint untuk menghapus data venue
/**
 * @swagger
 * /venue/{id}:
 *   delete:
 *     summary: Hapus venue
 *     tags: [Venue]
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
 *         description: Venue berhasil dihapus
 */
router.delete('/:id', authenticateToken, controller.deleteVenue);

module.exports = router;
