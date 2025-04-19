const express = require('express');
const router = express.Router();
const controller = require('./order.controller');

// Endpoint untuk membuat order
router.post('/', controller.createOrder);
// Endpoint untuk menampilkan seluruh data order
router.get('/', controller.getAllOrders);
// Endpoint untuk menampilkan satu data order
router.get('/:id', controller.getOrderById);
// Endpoint untuk mengedit data order
router.put('/:id', controller.updateOrder);
// Endpoint untuk menghapus data order
router.delete('/:id', controller.deleteOrder);
// Endpoint untuk menampilkan seluruh tiket yang dibeli user
router.get('/my-tickets', controller.getMyTickets);
// Endpoint untuk mengajukan refund tiket
router.post('/request-refund', controller.requestRefund);

module.exports = router;
