const { Order, Event, Ticket, IssuedTicket, OrderDetail } = require('../models');
const { v4: uuidv4 } = require('uuid');
const { queryAsync } = require('../config/db');

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
    where: { user_id: userId, order_status: 'paid' },
    include: [
      {
        model: Ticket,
        as: 'ticket',
        include: [
          {
            model: Event,
            as: 'event',
            attributes: ['event_name', 'event_date']
          }
        ]
      }
    ]
  });
};

// Mengajukan permintaan refund
exports.requestRefund = async ({ order_id }) => {
  const order = await Order.findOne({ where: { id: order_id } });
  if (!order) throw new Error('Order not found');
  if (order.status !== 'paid') throw new Error('Only paid orders can be refunded');
  order.status = 'refunded';
  await order.save();
  return order;
};

// Ambil email user dan nama event berdasarkan order_id
exports.getUserAndEventForOrder = async (orderId) => {
  const rows = await queryAsync(`
    SELECT u.email, e.event_name
    FROM orders o
    JOIN users u ON o.user_id = u.user_id
    JOIN events e ON o.event_id = e.event_id
    WHERE o.order_id = ?
  `, [orderId]);

  return rows[0];
};

// Fungsi membuat order beserta detail dan issued tickets
exports.createOrderWithTickets = async (orderData, orderDetailsData, userId) => {
  // 1. Buat order utama
  const order = await Order.create(orderData);

  // 2. Buat order_detail
  const detailsToCreate = orderDetailsData.map(({ ticket_id, quantity }) => ({
  ticket_id,
  quantity,
  order_id: order.id

}));

  const createdDetails = await OrderDetail.bulkCreate(detailsToCreate, { returning: true });
  

  // 3. Buat issued tickets dan kumpulkan hasilnya
  const issuedTickets = [];

  for (const detail of createdDetails) {
    for (let i = 0; i < detail.quantity; i++) {
      const ticketCode = uuidv4();

      const issued = await IssuedTicket.create({
        order_detail_id: detail.order_detail_id,
        user_id: userId,
        ticket_code: ticketCode,
        is_used: false
      });

      issuedTickets.push(issued);
    }
  }

  // 4. Return data order dan issuedTickets
  return {
    order,
    issuedTickets
  };
};