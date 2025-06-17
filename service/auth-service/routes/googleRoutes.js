// Import library Express
const express = require('express');
const router = express.Router();

// Import controller functions
const { sendMail } = require('../controllers/gmailController');
const { createEvent } = require('../controllers/calendarController');
const { getPlaceInfo } = require('../controllers/mapsController');

/**
 * @swagger
 * tags:
 *   name: Google APIs
 *   description: Integrasi Gmail, Calendar, dan Maps
 */

// Endpoint untuk mengirim email menggunakan Gmail API
/**
 * @swagger
 * /google/gmail/send:
 *   post:
 *     summary: Kirim email via Gmail API
 *     tags: [Google APIs]
 *     responses:
 *       200:
 *         description: Email berhasil dikirim
 *       500:
 *         description: Gagal mengirim email
 */
 router.post('/gmail/send', sendMail);

 // Endpoint untuk membuat event di Google Calendar
/**
 * @swagger
 * /google/calendar/create:
 *   post:
 *     summary: Buat event di Google Calendar
 *     tags: [Google APIs]
 *     responses:
 *       200:
 *         description: Event berhasil dibuat
 *       500:
 *         description: Gagal membuat event
 */
router.post('/calendar/create', createEvent);

// Endpoint untuk mencari informasi lokasi menggunakan Google Maps API
/**
 * @swagger
 * /google/maps/search:
 *   get:
 *     summary: Cari info lokasi dari Google Maps API
 *     tags: [Google APIs]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Kata kunci pencarian
 *     responses:
 *       200:
 *         description: Lokasi berhasil ditemukan
 *       500:
 *         description: Gagal mencari lokasi
 */
router.get('/maps/search', getPlaceInfo);


// Ekspor router agar bisa digunakan di file utama (app.js atau server.js)
module.exports = router;