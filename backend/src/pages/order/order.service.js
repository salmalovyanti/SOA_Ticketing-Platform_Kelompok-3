const db = require('../../config/database');
const { Order, Event, Ticket } = require('../../models');

// Membuat entri pesanan baru di database
exports.create = async (data) => {
  return await Order.create(data);
};

// Mengambil semua data pesanan beserta detail event
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

// Mengambil detail pesanan berdasarkan ID beserta informasi event
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

// Memperbarui data pesanan berdasarkan ID
exports.update = async (id, data) => {
  const order = await Order.findByPk(id);
  if (!order) return null;
  return await order.update(data);
};

// Menghapus data pesanan berdasarkan ID
exports.delete = async (id) => {
  const order = await Order.findByPk(id);
  if (!order) return null;
  await order.destroy();
  return order;
};

// Mengambil daftar tiket berdasarkan user_id untuk pesanan yang sudah dibayar
exports.getTicketsByUser = async (userId) => {
  return await Order.findAll({
    where: { user_id: userId, order_status: 'paid' }, // Pastikan status pesanan adalah 'paid'
    include: [
      {
        model: Ticket,
        as: 'ticket', // Asumsi relasi antara order dan ticket
        include: [
          {
            model: Event,
            as: 'event', // Asumsi relasi antara ticket dan event
            attributes: ['event_name', 'event_date']
          }
        ]
      }
    ]
  });
};

// Mengajukan permintaan refund untuk pesanan yang sudah dibayar
exports.requestRefund = async ({ order_id }) => {
  const order = await Order.findOne({ where: { id: order_id } });

  if (!order) throw new Error('Order not found');
  if (order.status !== 'paid') throw new Error('Only paid orders can be refunded');

  order.status = 'refunded';
  await order.save();

  return order;
};
