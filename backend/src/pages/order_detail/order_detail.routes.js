const express = require('express');
const router = express.Router();
const controller = require('./order_detail.controller');

router.post('/', controller.createOrderDetail);
router.get('/', controller.getAllOrderDetails);
router.get('/:id', controller.getOrderDetailById);
router.put('/:id', controller.updateOrderDetail);
router.delete('/:id', controller.deleteOrderDetail);

module.exports = router;
