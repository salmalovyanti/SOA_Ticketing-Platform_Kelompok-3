const sequelize = require('../config/database');

const Cart = require('./cart.model');
const Order = require('./order.model');
const OrderDetail = require('./order_detail.model');
const PromoCode = require('./promo_code.model');
const Ticket = require('./ticket.model');
const IssuedTicket = require('./issuedticket');
const User = require('./user.model');
const Event = require('./event.model');

OrderDetail.belongsTo(Ticket, { foreignKey: 'ticket_id', as: 'ticket' });
Ticket.hasMany(OrderDetail, { foreignKey: 'ticket_id', as: 'order_detail' });

Cart.belongsTo(Ticket, { foreignKey: 'ticket_id', as: 'ticket' });
Ticket.hasMany(Cart, { foreignKey: 'ticket_id', as: 'carts' });

IssuedTicket.belongsTo(OrderDetail, { foreignKey: 'order_detail_id' });
IssuedTicket.belongsTo(User, { foreignKey: 'user_id' });

Ticket.belongsTo(Event, { foreignKey: 'event_id', as: 'event' }); // ⬅️ ini juga harus ditambahkan
Event.hasMany(Ticket, { foreignKey: 'event_id', as: 'tickets' }); // optional jika butuh relasi 2 arah

module.exports = {
  sequelize,
  Cart,
  Order,
  OrderDetail,
  PromoCode,
  Ticket,
  IssuedTicket,
  Event,
};