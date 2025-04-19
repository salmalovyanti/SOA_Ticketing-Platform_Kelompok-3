const { OrderDetail, Ticket } = require('../../models');

// Membuat entri order detail baru di database
exports.create = async (data) => {
  return await OrderDetail.create(data);
};

// Mengambil semua data order detail beserta informasi tiket terkait
exports.getAll = async () => {
  return await OrderDetail.findAll({
    include: [
      {
        model: Ticket,
        as: 'ticket',
        attributes: ['ticket_type', 'price']
      }
    ]
  });
};

// Mengambil detail order detail berdasarkan ID beserta informasi tiket
exports.getById = async (id) => {
  return await OrderDetail.findByPk(id, {
    include: [
      {
        model: Ticket,
        as: 'ticket',
        attributes: ['ticket_type', 'price']
      }
    ]
  });
};

// Memperbarui data order detail berdasarkan ID
exports.update = async (id, data) => {
  const orderDetail = await OrderDetail.findByPk(id);
  if (!orderDetail) throw new Error('OrderDetail not found');
  await orderDetail.update(data);
  return orderDetail;
};

// Menghapus data order detail berdasarkan ID
exports.delete = async (id) => {
  const orderDetail = await OrderDetail.findByPk(id);
  if (!orderDetail) throw new Error('OrderDetail not found');
  await orderDetail.destroy();
};
