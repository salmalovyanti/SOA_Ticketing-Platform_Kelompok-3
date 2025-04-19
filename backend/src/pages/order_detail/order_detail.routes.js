const express = require('express');
const router = express.Router();
const controller = require('./order_detail.controller');

// Endpoint untuk membuat order detail
router.post('/', controller.createOrderDetail);
// Endpoint untuk menampilkan seluruh data order detail
router.get('/', controller.getAllOrderDetails);
// Endpoint untuk menampilkan satu data order detail
router.get('/:id', controller.getOrderDetailById);
// Endpoint untuk mengedit data order detail
router.put('/:id', controller.updateOrderDetail);
// Endpoint untuk menghapus data order detail
router.delete('/:id', controller.deleteOrderDetail);

module.exports = router;
