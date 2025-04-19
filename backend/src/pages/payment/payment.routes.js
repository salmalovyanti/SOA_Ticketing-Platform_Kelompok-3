const express = require('express');
const router = express.Router();
const paymentController = require('./payment.controller');

// Endpoint untuk membatalkan pembelian tiket
router.post('/cancel-ticket', paymentController.cancelTicket);

module.exports = router;
