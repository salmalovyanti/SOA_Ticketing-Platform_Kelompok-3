const Category = require('../models/category.model');

// Mengambil semua data kategori dari database
exports.getAll = async () => {
  return await Category.findAll();
};

// Menambahkan data kategori baru ke database
exports.create = async (data) => {
  return await Category.create(data);
};

// Mengambil detail kategori berdasarkan ID
exports.getById = async (id) => {
  return await Category.findByPk(id);
};

// Memperbarui data kategori berdasarkan ID
exports.update = async (id, data) => {
  const [updated] = await Category.update(data, {
    where: { category_id: id }
  });
  return updated;
};

// Menghapus data kategori berdasarkan ID
exports.remove = async (id) => {
  const deleted = await Category.destroy({
    where: { category_id: id }
  });
  return deleted;
};
