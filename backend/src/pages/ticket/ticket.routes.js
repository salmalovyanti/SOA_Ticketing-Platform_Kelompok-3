const express = require('express');
const router = express.Router();
const controller = require('./ticket.controller');
const { validateBulkUploadTickets } = require('./ticket.validations');
const { authenticateToken } = require('../../middleware/authMiddleware');

// Endpoint untuk scan tiket barcode
router.get('/scan-ticket', authenticateToken, controller.scanTicket);
// Endpoint untuk menambahkan jenis tiket ke event
router.post('/', authenticateToken, controller.createTicket);
// Endpoint untuk menampilkan seluruh data tiket
router.get('/', authenticateToken, controller.getAllTickets);
// Endpoint untuk menapilkan satu data tiket
router.get('/:id', authenticateToken, controller.getTicketById);
// Endpoint untuk mengedit data tiket
router.put('/:id', authenticateToken, controller.updateTicket);
// Endpoint untuk menghapus data tiket
router.delete('/:id', authenticateToken, controller.deleteTicket);
// Endpoint untuk membeli tiket
router.post('/purchase-ticket', authenticateToken, controller.purchaseTicket);
// Endpoint untuk mengupload tiket dalam jumlah yang banyak
router.post('/bulk-upload', authenticateToken, validateBulkUploadTickets, controller.bulkUploadTickets);

module.exports = router;