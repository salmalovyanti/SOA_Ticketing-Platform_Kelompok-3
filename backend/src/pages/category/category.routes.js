const express = require('express');
const router = express.Router();
const controller = require('./category.controller');

// Fitur menampilkan keseluruhan kategori event
router.get('/', controller.getAllCategories); //
// Fitur menambahkan kategori event
router.post('/', controller.createCategory);
// Fitur melihat satu kategori event
router.get('/:id', controller.getCategoryById);
// Fitur mengedit kategori event
router.put('/:id', controller.updateCategory);
// Fitur menghapus satu kategori event
router.delete('/:id', controller.deleteCategory);

module.exports = router;
