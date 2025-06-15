const express = require('express');
const router = express.Router();
const controller = require('./waiting_queue.controller');
const { authenticateToken } = require('../../middleware/authMiddleware');

// Endpoint untuk menambahkan data antrian
router.post('/', authenticateToken, controller.createQueue);
// Endpoint untuk menampilkan seluruh data antrian
router.get('/', authenticateToken, controller.getAllQueues);
// Endpoint untuk menampilkan satu data antrian
router.get('/:id', authenticateToken, controller.getQueueById);
// Endpoint untuk mengedit data antrian
router.put('/:id', authenticateToken, controller.updateQueue);
// Endpoint untuk menghapus data antrian
router.delete('/:id', authenticateToken, controller.deleteQueue);

module.exports = router;
