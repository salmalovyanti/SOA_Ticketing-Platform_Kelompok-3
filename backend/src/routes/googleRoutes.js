const express = require('express');
const router = express.Router();

const { sendMail } = require('../controllers/gmailController');
const { createEvent } = require('../controllers/calendarController');
const { getPlaceInfo } = require('../controllers/mapsController');

router.post('/gmail/send', sendMail);
router.post('/calendar/create', createEvent);
router.get('/maps/search', getPlaceInfo);

module.exports = router;
