const express = require('express');
const router = express.Router();
const controller = require('./notification_preference.controller');
const validate = require('./notification_preference.validations');
const { authenticateToken } = require('../../../middleware/authMiddleware');

// Endpoint untuk mengedit preferensi notifikasi user
router.post('/', authenticateToken, validate.updatePreference, controller.updatePreference);

module.exports = router;
