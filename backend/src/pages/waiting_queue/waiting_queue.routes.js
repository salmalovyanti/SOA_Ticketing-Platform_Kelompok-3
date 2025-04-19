const express = require('express');
const router = express.Router();
const controller = require('./waiting_queue.controller');

// Endpoint untuk menambahkan data antrian
router.post('/', controller.createQueue);
// Endpoint untuk menampilkan seluruh data antrian
router.get('/', controller.getAllQueues);
// Endpoint untuk menampilkan satu data antrian
router.get('/:id', controller.getQueueById);
// Endpoint untuk mengedit data antrian
router.put('/:id', controller.updateQueue);
// Endpoint untuk menghapus data antrian
router.delete('/:id', controller.deleteQueue);

module.exports = router;
