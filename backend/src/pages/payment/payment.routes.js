const express = require('express');
const router = express.Router();
const paymentController = require('./payment.controller');
const { authenticateToken } = require('../../middleware/authMiddleware');

// Endpoint untuk membatalkan pembelian tiket
router.post('/cancel-ticket', authenticateToken, paymentController.cancelTicket);

module.exports = router;