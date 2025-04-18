const db = require('../../config/database'); 
const { Ticket, Event, Category, User } = require('../../models');

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

// ---

// Get Tickets by Event ID
exports.getByEventId = async (eventId) => {
  return await Ticket.findAll({
    where: { event_id: eventId },
    include: [
      {
        model: Event,
        as: 'event',
        include: [{
            model: Category,
            as: 'category', // kalo Event.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });
            attributes: ['category_name']
          }],
        attributes: ['event_name']
      }
    ]
  });
};

exports.purchase = async (data) => {
  const { user_id, event_id, ticket_id } = data;

  // Cek jika user ada
  const user = await User.findByPk(user_id);
  if (!user) {
    throw new Error('User not found');
  }

  // Cek jika event ada
  const event = await Event.findByPk(event_id);
  if (!event) {
    throw new Error('Event not found');
  }

  // Cek jika ticket ada
  const ticket = await Ticket.findByPk(ticket_id);
  if (!ticket) {
    throw new Error('Ticket not available');
  }

  // Pembelian ticket
  const purchasedTicket = await Ticket.create({
    user_id,
    event_id,
    ticket_id,
    status: 'purchased',
    purchase_date: new Date(),
  });

  return purchasedTicket;
};