const db = require('../../config/database');
const { Order, Event, Ticket } = require('../../models');

exports.create = async (data) => {
  return await Order.create(data);
};

exports.getAll = async () => {
  return await Order.findAll({
    include: [
      {
        model: Event,
        as: 'event',
        attributes: ['event_name', 'event_date']
      }
    ]
  });
};

exports.getById = async (id) => {
  return await Order.findByPk(id, {
    include: [
      {
        model: Event,
        as: 'event',
        attributes: ['event_name', 'event_date']
      }
    ]
  });
};

exports.update = async (id, data) => {
  const order = await Order.findByPk(id);
  if (!order) return null;
  return await order.update(data);
};

exports.delete = async (id) => {
  const order = await Order.findByPk(id);
  if (!order) return null;
  await order.destroy();
  return order;
};

// Get tickets by user_id
exports.getTicketsByUser = async (userId) => {
  return await Order.findAll({
    where: { user_id: userId, order_status: 'paid' }, // Ensure the order is paid
    include: [
      {
        model: Ticket,
        as: 'ticket', // Assuming ticket is related to order
        include: [
          {
            model: Event,
            as: 'event', // Assuming ticket is linked to event
            attributes: ['event_name', 'event_date']
          }
        ]
      }
    ]
  });
};

// Request Refund
exports.requestRefund = async ({ order_id }) => {
  const order = await Order.findOne({ where: { id: order_id } });

  if (!order) throw new Error('Order not found');
  if (order.status !== 'paid') throw new Error('Only paid orders can be refunded');

  order.status = 'refunded';
  await order.save();

  return order;
}; 