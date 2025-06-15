const express = require('express');
const router = express.Router();
const controller = require('../controllers/order_detail.controller');
const { authenticateToken } = require('../../middleware/authMiddleware');

// Endpoint untuk membuat order detail
router.post('/', authenticateToken, controller.createOrderDetail);
// Endpoint untuk menampilkan seluruh data order detail
router.get('/', authenticateToken, controller.getAllOrderDetails);
// Endpoint untuk menampilkan satu data order detail
router.get('/:id', authenticateToken, controller.getOrderDetailById);
// Endpoint untuk mengedit data order detail
router.put('/:id', authenticateToken, controller.updateOrderDetail);
// Endpoint untuk menghapus data order detail
router.delete('/:id', authenticateToken, controller.deleteOrderDetail);

module.exports = router;
