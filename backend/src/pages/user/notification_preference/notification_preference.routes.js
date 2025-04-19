const express = require('express');
const router = express.Router();
const controller = require('./notification_preference.controller');
const validate = require('./notification_preference.validation');
const authenticate = require('../../../middleware/auth.middleware');

router.post('/', authenticate, validate.updatePreference, controller.updatePreference);

module.exports = router;
