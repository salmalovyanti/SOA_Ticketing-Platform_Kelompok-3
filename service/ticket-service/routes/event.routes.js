/**
 * @swagger
 * tags:
 *   name: Event
 *   description: Manajemen event
 */

const express = require('express');
const router = express.Router();
const controller = require('../controllers/event.controller');
const { authenticateToken } = require('../middleware/authMiddleware');
const ticketController = require('../controllers/ticket.controller');

// Endpoint untuk menampilkan seluruh data event
/**
 * @swagger
 * /event:
 *   get:
 *     summary: Ambil semua data event
 *     tags: [Event]
 *     responses:
 *       200:
 *         description: Semua event ditampilkan
 */
router.get('/', controller.getAllEvents);

// Endpoint untuk menambahkan event
/**
 * @swagger
 * /event:
 *   post:
 *     summary: Tambah event baru
 *     tags: [Event]
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
 *         description: Event berhasil ditambahkan
 */
router.post('/', authenticateToken, controller.createEvent);

// Endpoint untuk melihat event berdasarkan nama kategori
/**
 * @swagger
 * /event/category/{id}:
 *   get:
 *     summary: Ambil event berdasarkan kategori
 *     tags: [Event]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Event berdasarkan kategori ditemukan
 */
router.get('/category/:id', controller.getByCategory);

// Endpoint untuk melihat event berdasarkan lokasi
/**
 * @swagger
 * /event/location/{id}:
 *   get:
 *     summary: Ambil event berdasarkan lokasi
 *     tags: [Event]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Event berdasarkan lokasi ditemukan
 */
router.get('/location/:id', controller.getByLocation);

// Endpoint untuk melihat tiket berdasarkan satu event
/**
 * @swagger
 * /event/{eventId}/ticket:
 *   get:
 *     summary: Ambil tiket dari satu event
 *     tags: [Event]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tiket ditampilkan
 */
router.get('/:eventId/ticket', ticketController.getByEventId);

// Endpoint untuk mencari event berdasarkan nama event
/**
 * @swagger
 * /event/search:
 *   get:
 *     summary: Cari event berdasarkan nama
 *     tags: [Event]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Hasil pencarian event
 */
router.get('/search', controller.searchEvents);

// Endpoint untuk melihat detail event
/**
 * @swagger
 * /event/{id}:
 *   get:
 *     summary: Ambil detail event berdasarkan ID
 *     tags: [Event]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detail event ditemukan
 */
router.get('/:id', controller.getEventById);

// Endpoint untuk update detail event
/**
 * @swagger
 * /event/{id}:
 *   put:
 *     summary: Update event
 *     tags: [Event]
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
 *         description: Event berhasil diupdate
 */
router.put('/:id', authenticateToken, controller.updateEvent);

// Endpoint untuk menghapus event
/**
 * @swagger
 * /event/{id}:
 *   delete:
 *     summary: Hapus event
 *     tags: [Event]
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
 *         description: Event berhasil dihapus
 */
router.delete('/:id', authenticateToken, controller.deleteEvent);

module.exports = router;