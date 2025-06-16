const express = require('express');
const router = express.Router();
const controller = require('../controllers/order.controller');
const { authenticateToken } = require('../middleware/authMiddleware');

// Endpoint untuk membuat order
router.post('/', authenticateToken, controller.createOrder);
// Endpoint untuk menampilkan seluruh data order
router.get('/', authenticateToken, controller.getAllOrders);
// Endpoint untuk menampilkan satu data order
router.get('/:id', authenticateToken, controller.getOrderById);
// Endpoint untuk mengedit data order
router.put('/:id', authenticateToken, controller.updateOrder);
// Endpoint untuk menghapus data order
router.delete('/:id', authenticateToken, controller.deleteOrder);
// Endpoint untuk menampilkan seluruh tiket yang dibeli user
router.get('/my-tickets', authenticateToken, controller.getMyTickets);
// Endpoint untuk mengajukan refund tiket
router.post('/request-refund', authenticateToken, controller.requestRefund);

module.exports = router;
