const { Cart, Ticket, Event } = require('../../models');

// Ambil isi keranjang user
exports.getCartByUser = async (user_id) => {
  return await Cart.findAll({
    where: { user_id },
    include: [
      {
        model: Ticket,
        as: 'ticket',
        attributes: ['ticket_id', 'ticket_name', 'price', 'quota'],
        include: [
          {
            model: Event,
            as: 'event',
            attributes: ['event_id', 'event_name', 'event_date']
          }
        ]
      }
    ],
    order: [['created_at', 'DESC']]
  });
};

// Tambah tiket ke keranjang
exports.addToCart = async (data) => {
  return await Cart.create({
    user_id: data.user_id,
    ticket_id: data.ticket_id,
    quantity: data.quantity
  });
};
