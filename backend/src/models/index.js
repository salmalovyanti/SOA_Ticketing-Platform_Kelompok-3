const sequelize = require('../config/database');

const Category = require('../pages/category/category.model');
const Event = require('../pages/event/event.model');
const Location = require('../pages/location/location.model');
const Order = require('../pages/order/order.model');
const OrderDetail = require('../pages/order_detail/order_detail.model');
const Ticket = require('../pages/ticket/ticket.model');
const User = require('../pages/user/user.model');
const Venue = require('../pages/venue/venue.model');
const WaitingQueue = require('../pages/waiting_queue/waiting_queue.model')

// ASSOCIATIONS
Category.hasMany(Event, { foreignKey: 'category_id' });
Event.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });
Event.belongsTo(Venue, { foreignKey: 'venue_id', as: 'venue' });
Venue.belongsTo(Location, { foreignKey: 'location_id', as: 'location' });
Ticket.belongsTo(Event, { foreignKey: 'event_id', as: 'event' });
OrderDetail.belongsTo(Ticket, { foreignKey: 'ticket_id', as: 'ticket' });
Ticket.hasMany(OrderDetail, { foreignKey: 'ticket_id', as: 'order_detail' });
Event.hasMany(WaitingQueue, { foreignKey: 'event_id', as: 'waiting_queue'});
WaitingQueue.belongsTo(Event, { foreignKey: 'event_id', as: 'event' });
Location.hasMany(Venue, { foreignKey: 'location_id' });
WaitingQueue.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(WaitingQueue, { foreignKey: 'user_id', as: 'waiting_queue' });



module.exports = {
  sequelize,
  Category,  
  Event,
  Location,
  Order,
  OrderDetail,
  Ticket,
  User,
  Venue,
  WaitingQueue
};
