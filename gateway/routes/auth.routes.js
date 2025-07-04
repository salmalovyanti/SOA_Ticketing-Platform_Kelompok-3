const express = require('express');
const router = express.Router();
const proxy = require('../utils/apiProxy');

router.use('/', proxy('http://localhost:3002'));

module.exports = router;