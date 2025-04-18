const { Location } = require('../../models');

exports.getAll = async () => {
  return await Location.findAll();
};

exports.create = async (data) => {
  return await Location.create(data);
};

exports.getById = async (id) => {
  return await Location.findByPk(id);
};

exports.update = async (id, data) => {
  const [updated] = await Location.update(data, {
    where: { location_id: id }
  });
  return updated;
};

exports.remove = async (id) => {
  const deleted = await Location.destroy({
    where: { location_id: id }
  });
  return deleted;
};
