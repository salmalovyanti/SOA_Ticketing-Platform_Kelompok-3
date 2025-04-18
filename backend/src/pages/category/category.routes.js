const express = require('express');
const router = express.Router();
const controller = require('./category.controller');

router.get('/', controller.getAllCategories); //
router.post('/', controller.createCategory);
router.get('/:id', controller.getCategoryById);
router.put('/:id', controller.updateCategory);
router.delete('/:id', controller.deleteCategory);

module.exports = router;
