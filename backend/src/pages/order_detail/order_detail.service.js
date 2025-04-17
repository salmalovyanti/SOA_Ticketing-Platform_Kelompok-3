const { OrderDetail, Ticket } = require('../../models');

exports.create = async (data) => {
  return await OrderDetail.create(data);
};

exports.getAll = async () => {
  return await OrderDetail.findAll({
    include: [
      {
        model: Ticket,
        as: 'ticket',
        attributes: ['ticket_name', 'ticket_type', 'price']
      }
    ]
  });
};

exports.getById = async (id) => {
  return await OrderDetail.findByPk(id, {
    include: [
      {
        model: Ticket,
        as: 'ticket',
        attributes: ['ticket_name', 'ticket_type', 'price']
      }
    ]
  });
};

exports.update = async (id, data) => {
  const orderDetail = await OrderDetail.findByPk(id);
  if (!orderDetail) throw new Error('OrderDetail not found');
  await orderDetail.update(data);
  return orderDetail;
};

exports.delete = async (id) => {
  const orderDetail = await OrderDetail.findByPk(id);
  if (!orderDetail) throw new Error('OrderDetail not found');
  await orderDetail.destroy();
};
