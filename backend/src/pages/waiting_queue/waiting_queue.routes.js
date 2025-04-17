const express = require('express');
const router = express.Router();
const controller = require('./waiting_queue.controller');

router.post('/', controller.createQueue);
router.get('/', controller.getAllQueues);
router.get('/:id', controller.getQueueById);
router.put('/:id', controller.updateQueue);
router.delete('/:id', controller.deleteQueue);

module.exports = router;
