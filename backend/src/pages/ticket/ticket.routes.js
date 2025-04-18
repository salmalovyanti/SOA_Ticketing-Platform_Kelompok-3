const express = require('express');
const router = express.Router();
const controller = require('./ticket.controller');

router.post('/', controller.createTicket);
router.get('/', controller.getAllTickets);
router.get('/:id', controller.getTicketById);
router.put('/:id', controller.updateTicket);
router.delete('/:id', controller.deleteTicket);
router.post('/purchase-ticket', ticketController.purchaseTicket);

module.exports = router;
