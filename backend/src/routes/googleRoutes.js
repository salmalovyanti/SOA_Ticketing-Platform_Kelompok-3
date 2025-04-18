const express = require('express');
const router = express.Router();

// Pastikan controller ini sesuai dengan struktur folder dan sudah benar
const { sendMail } = require('../controllers/gmailController');
const { createEvent } = require('../controllers/calendarController');
const { getPlaceInfo } = require('../controllers/mapsController');

// Pastikan masing-masing fungsi controller terdefinisi dengan benar
router.post('/gmail/send', sendMail);
router.post('/calendar/create', createEvent);
router.get('/maps/search', getPlaceInfo);

module.exports = router;
