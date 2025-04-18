const express = require('express');
const router = express.Router();
const paymentController = require('./payment.controller');

// POST endpoint to cancel ticket
router.post('/cancel-ticket', paymentController.cancelTicket);

module.exports = router;
