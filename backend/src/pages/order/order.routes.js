const express = require('express');
const router = express.Router();
const controller = require('./order.controller');

router.post('/', controller.createOrder);
router.get('/', controller.getAllOrders);
router.get('/:id', controller.getOrderById);
router.put('/:id', controller.updateOrder);
router.delete('/:id', controller.deleteOrder);

module.exports = router;
