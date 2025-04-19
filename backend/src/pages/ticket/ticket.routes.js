const express = require('express');
const router = express.Router();
const controller = require('./ticket.controller');
const { validateBulkUploadTickets } = require('./ticket.validations');

// Fitur menambahkan jenis tiket ke event
router.post('/', controller.createTicket);
// Fitur menampilkan seluruh data tiket
router.get('/', controller.getAllTickets);
// Fitur menapilkan satu data tiket
router.get('/:id', controller.getTicketById);
// Fitur mengedit data tiket
router.put('/:id', controller.updateTicket);
// Fitur menghapus data tiket
router.delete('/:id', controller.deleteTicket);
// Fitur membeli tiket
router.post('/purchase-ticket', controller.purchaseTicket);
// fitur mengupload tiket dalam jumlah yang banyak
router.post('/bulk-upload', validateBulkUploadTickets, controller.bulkUploadTickets);

module.exports = router;
