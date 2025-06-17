/**
 * @swagger
 * tags:
 *   name: Location
 *   description: Manajemen lokasi event
 */

const express = require('express');
const router = express.Router();
const controller = require('../controllers/location.controller');
const { authenticateToken } = require('../middleware/authMiddleware');

// Endpoint untuk menampilkan seluruh data lokasi
/**
 * @swagger
 * /location:
 *   get:
 *     summary: Ambil semua data lokasi
 *     tags: [Location]
 *     responses:
 *       200:
 *         description: Semua lokasi berhasil ditampilkan
 */
router.get('/', controller.getAllLocations);

// Endpoint untuk menambahkan lokasi
/**
 * @swagger
 * /location:
 *   post:
 *     summary: Tambah lokasi
 *     tags: [Location]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Lokasi berhasil ditambahkan
 */
router.post('/', authenticateToken, controller.createLocation);

// Endpoint untuk menampilkan satu lokasi
/**
 * @swagger
 * /location/{id}:
 *   get:
 *     summary: Ambil lokasi berdasarkan ID
 *     tags: [Location]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Lokasi ditemukan
 */
router.get('/:id', controller.getLocationById);

// Endpoint untuk mengedit lokasi
/**
 * @swagger
 * /location/{id}:
 *   put:
 *     summary: Update lokasi berdasarkan ID
 *     tags: [Location]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Lokasi berhasil diupdate
 */
router.put('/:id', authenticateToken, controller.updateLocation);

// Endpoint untuk menghapus lokasi
/**
 * @swagger
 * /api/location/{id}:
 *   delete:
 *     summary: Hapus lokasi berdasarkan ID
 *     tags: [Location]
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
 *         description: Lokasi berhasil dihapus
 */
router.delete('/:id', authenticateToken, controller.deleteLocation);

module.exports = router;
