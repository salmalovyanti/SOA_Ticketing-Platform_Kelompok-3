const express = require('express');
const router = express.Router();
const controller = require('./ticket.controller');
const { validateBulkUploadTickets } = require('./ticket.validations');

router.post('/', controller.createTicket);
router.get('/', controller.getAllTickets);
router.get('/:id', controller.getTicketById);
router.put('/:id', controller.updateTicket);
router.delete('/:id', controller.deleteTicket);
router.post('/purchase-ticket', controller.purchaseTicket);
router.post('/bulk-upload', validateBulkUploadTickets, controller.bulkUploadTickets);

module.exports = router;
