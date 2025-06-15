const express = require('express');
const router = express.Router();
const controller = require('./category.controller');
const { authenticateToken } = require('../../middleware/authMiddleware');

// Endpoint untuk menampilkan keseluruhan kategori event
router.get('/', controller.getAllCategories);
// Endpoint untuk menambahkan kategori event
router.post('/', authenticateToken, controller.createCategory);
// Endpoint untuk melihat satu kategori event
router.get('/:id', controller.getCategoryById);
// Endpoint untuk mengedit kategori event
router.put('/:id', authenticateToken, controller.updateCategory);
// Endpoint untuk menghapus satu kategori event
router.delete('/:id', authenticateToken, controller.deleteCategory);

module.exports = router;
