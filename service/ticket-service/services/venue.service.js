const { Venue, Location } = require('../models');

// Menampilkan seluruh data venue
exports.getAll = async () => {
  return await Venue.findAll({
    include: {
      model: Location,
      as: 'location',
      attributes: ['location_name']
    }
  });
};

// Menambahkan data venue
exports.create = async (data) => {
  return await Venue.create(data);
};

// Menampilkan satu data venue
exports.getById = async (id) => {
  return await Venue.findByPk(id, {
    include: {
      model: Location,
      as: 'location',
      attributes: ['location_name']
    }
  });
};

// Mengedit data venue
exports.update = async (id, data) => {
  const [updated] = await Venue.update(data, { where: { venue_id: id } });
  return updated > 0;
};

// Menghapus data venue
exports.delete = async (id) => {
  const deleted = await Venue.destroy({ where: { venue_id: id } });
  return deleted > 0;
};