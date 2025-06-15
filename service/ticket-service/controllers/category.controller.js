const service = require('../services/category.service');

// Handler untuk menampilkan keseluruhan kategori event
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await service.getAll();
    res.json(categories);
  } catch (err) {
    console.error('❌ Error saat getAllCategories:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Handler untuk menambahkan kategori event
exports.createCategory = async (req, res) => {
  try {
    const newCategory = await service.create(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Handler untuk melihat satu kategori event
exports.getCategoryById = async (req, res) => {
  try {
    const category = await service.getById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
  } catch (err) {
    console.error('❌ Error saat getCategoryById:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Handler untuk mengedit kategori event
exports.updateCategory = async (req, res) => {
  try {
    const updated = await service.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json({ message: 'Category updated successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Handler untuk menghapus satu kategori event
exports.deleteCategory = async (req, res) => {
  try {
    const deleted = await service.remove(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    console.error('❌ Error saat deleteCategory:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
