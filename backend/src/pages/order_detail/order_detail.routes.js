const express = require('express');
const router = express.Router();
const controller = require('./order_detail.controller');

// Fitur membuatorder detail
router.post('/', controller.createOrderDetail);
// Fitur menampilkan seluruh data order detail
router.get('/', controller.getAllOrderDetails);
// Fitur menampilkan satu data order detail
router.get('/:id', controller.getOrderDetailById);
// Fitur mengedit data order detail
router.put('/:id', controller.updateOrderDetail);
// Fitur menghapus data order detail
router.delete('/:id', controller.deleteOrderDetail);

module.exports = router;
