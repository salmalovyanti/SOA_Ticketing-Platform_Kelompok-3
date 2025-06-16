// Import library Express
const express = require('express');
const router = express.Router();

// Import controller functions
const { sendMail } = require('../controllers/gmailController');
const { createEvent } = require('../controllers/calendarController');
const { getPlaceInfo } = require('../controllers/mapsController');

// Endpoint untuk mengirim email menggunakan Gmail API
router.post('/gmail/send', sendMail);
// Endpoint untuk membuat event di Google Calendar
router.post('/calendar/create', createEvent);
// Endpoint untuk mencari informasi lokasi menggunakan Google Maps API
router.get('/maps/search', getPlaceInfo);


// Ekspor router agar bisa digunakan di file utama (app.js atau server.js)
module.exports = router;
