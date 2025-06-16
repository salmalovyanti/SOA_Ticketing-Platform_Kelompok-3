const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth.routes'));
router.use('/ticket', require('./ticket.routes'));
router.use('/order', require('./order.routes'));
router.use('/payment', require('./payment.routes'));

module.exports = router;
