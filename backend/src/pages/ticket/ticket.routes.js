const express = require('express');
const router = express.Router();
const controller = require('./ticket.controller');
const { validateBulkUploadTickets } = require('./ticket.validations');

// Endpoint untuk scan tiket barcode
router.get('/scan-ticket', controller.scanTicket);
// Endpoint untuk menambahkan jenis tiket ke event
router.post('/', controller.createTicket);
// Endpoint untuk menampilkan seluruh data tiket
router.get('/', controller.getAllTickets);
// Endpoint untuk menapilkan satu data tiket
router.get('/:id', controller.getTicketById);
// Endpoint untuk mengedit data tiket
router.put('/:id', controller.updateTicket);
// Endpoint untuk menghapus data tiket
router.delete('/:id', controller.deleteTicket);
// Endpoint untuk membeli tiket
router.post('/purchase-ticket', controller.purchaseTicket);
// Endpoint untuk mengupload tiket dalam jumlah yang banyak
router.post('/bulk-upload', validateBulkUploadTickets, controller.bulkUploadTickets);

module.exports = router;