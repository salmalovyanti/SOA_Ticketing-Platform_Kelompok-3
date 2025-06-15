const sequelize = require('../config/database');

const Cart = require('./cart.model');
const Order = require('./order.model');
const OrderDetail = require('./order_detail.model');
const PromoCode = require('./promo_code.model');
const Ticket = require('./ticket.model');
const IssuedTicket = require('./issuedticket');

OrderDetail.belongsTo(Ticket, { foreignKey: 'ticket_id', as: 'ticket' });
Ticket.hasMany(OrderDetail, { foreignKey: 'ticket_id', as: 'order_detail' });

Cart.belongsTo(Ticket, { foreignKey: 'ticket_id', as: 'ticket' });
Ticket.hasMany(Cart, { foreignKey: 'ticket_id', as: 'carts' });

IssuedTicket.belongsTo(OrderDetail, { foreignKey: 'order_detail_id' });
IssuedTicket.belongsTo(User, { foreignKey: 'user_id' });

module.exports = {
  sequelize,
  Cart,
  Order,
  OrderDetail,
  PromoCode,
  Ticket,
  IssuedTicket
};
