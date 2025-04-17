const { Ticket, Event } = require('../../models');

// Create
exports.create = async (data) => {
  return await Ticket.create(data);
};

// Get All
exports.getAll = async () => {
  return await Ticket.findAll({
    include: {
      model: Event,
      as: 'event',
      attributes: ['event_name']
    }
  });
};

// Get by ID
exports.getById = async (id) => {
  return await Ticket.findByPk(id, {
    include: {
      model: Event,
      as: 'event',
      attributes: ['event_name']
    }
  });
};

// Update
exports.update = async (id, data) => {
  const ticket = await Ticket.findByPk(id);
  if (!ticket) return null;
  return await ticket.update(data);
};

// Delete
exports.delete = async (id) => {
  const ticket = await Ticket.findByPk(id);
  if (!ticket) return null;
  await ticket.destroy();
  return ticket;
};
