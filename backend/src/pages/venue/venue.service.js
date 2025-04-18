const { Venue, Location } = require('../../models');

exports.getAll = async () => {
  return await Venue.findAll({
    include: {
      model: Location,
      as: 'location',
      attributes: ['location_name']
    }
  });
};

exports.create = async (data) => {
  return await Venue.create(data);
};

exports.getById = async (id) => {
  return await Venue.findByPk(id, {
    include: {
      model: Location,
      as: 'location',
      attributes: ['location_name']
    }
  });
};

exports.update = async (id, data) => {
  const [updated] = await Venue.update(data, { where: { venue_id: id } });
  return updated > 0;
};

exports.delete = async (id) => {
  const deleted = await Venue.destroy({ where: { venue_id: id } });
  return deleted > 0;
};
