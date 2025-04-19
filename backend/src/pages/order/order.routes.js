const express = require('express');
const router = express.Router();
const controller = require('./order.controller');

// Fitur membuat order
router.post('/', controller.createOrder);
// Fitur menampilkan seluruh data order
router.get('/', controller.getAllOrders);
// Fitur menampilkan satu data order
router.get('/:id', controller.getOrderById);
// Fitur mengedit data order
router.put('/:id', controller.updateOrder);
// Fitur menghapus data order
router.delete('/:id', controller.deleteOrder);
// Fitur menampilkan seluruh tiket yang dibeli user
router.get('/my-tickets', controller.getMyTickets);
// Fitur mengajukan refund tiket
router.post('/request-refund', controller.requestRefund);


module.exports = router;
