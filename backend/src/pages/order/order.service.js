const db = require('../../config/database');
const { Order, Event } = require('../../models');

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
