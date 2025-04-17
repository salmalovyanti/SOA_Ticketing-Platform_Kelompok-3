const db = require('../../config/database'); // atau model event
const Event = require('./event.model');

exports.getAll = async () => {
  return await Event.findAll();
};

exports.create = async (data) => {
  return await Event.create(data);
};

exports.getById = async (id) => {
  return await Event.findByPk(id); // atau findOne({ where: { event_id: id } }) kalau perlu
};
