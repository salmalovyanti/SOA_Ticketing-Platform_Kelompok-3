const express = require('express');
const router = express.Router();
const controller = require('./waiting_queue.controller');

// Fitur menambahkan data antrian
router.post('/', controller.createQueue);
// Fitur menampilkan seluruh data antrian
router.get('/', controller.getAllQueues);
// Fitur menampilkan satu data antrian
router.get('/:id', controller.getQueueById);
// Fitur mengedit data antrian
router.put('/:id', controller.updateQueue);
// Fitur menghapus data antrian
router.delete('/:id', controller.deleteQueue);

module.exports = router;
