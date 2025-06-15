const { Location } = require('../shared_models');

// Mengambil semua data lokasi dari database
exports.getAll = async () => {
  return await Location.findAll();
};

// Menambahkan data lokasi baru ke database
exports.create = async (data) => {
  return await Location.create(data);
};

// Mengambil detail lokasi berdasarkan ID
exports.getById = async (id) => {
  return await Location.findByPk(id);
};

// Memperbarui data lokasi berdasarkan ID
exports.update = async (id, data) => {
  const [updated] = await Location.update(data, {
    where: { location_id: id }
  });
  return updated;
};

// Menghapus data lokasi berdasarkan ID
exports.remove = async (id) => {
  const deleted = await Location.destroy({
    where: { location_id: id }
  });
  return deleted;
};
