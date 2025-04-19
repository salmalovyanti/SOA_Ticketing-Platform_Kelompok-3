// Mengimpor koneksi ke database (Sequelize instance)
const sequelize = require('../config/database');

// Mengimpor semua model yang digunakan di aplikasi
const Cart = require('../pages/cart/cart.model');
const Category = require('../pages/category/category.model');
const Event = require('../pages/event/event.model');
const Location = require('../pages/location/location.model');
const Order = require('../pages/order/order.model');
const OrderDetail = require('../pages/order_detail/order_detail.model');
const Payment = require('../pages/payment/payment.model');
const PromoCode = require('../pages/promo_code/promo_code.model');
const Ticket = require('../pages/ticket/ticket.model');
const User = require('../pages/user/user.model');
const Venue = require('../pages/venue/venue.model');
const WaitingQueue = require('../pages/waiting_queue/waiting_queue.model')
const Wishlist = require('../pages/wishlist/wishlist.model');

// ASSOCIATIONS- Menentukan relasi antar model

// Satu kategori bisa memiliki banyak event
Category.hasMany(Event, { foreignKey: 'category_id' });
// Setiap event dimiliki oleh satu kategori
Event.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

// Setiap event memiliki satu venue
Event.belongsTo(Venue, { foreignKey: 'venue_id', as: 'venue' });

// Setiap venue berada di satu lokasi
Venue.belongsTo(Location, { foreignKey: 'location_id', as: 'location' });

// Setiap tiket dimiliki oleh satu event
Ticket.belongsTo(Event, { foreignKey: 'event_id', as: 'event' });

// Setiap detail pesanan berhubungan dengan satu tiket
OrderDetail.belongsTo(Ticket, { foreignKey: 'ticket_id', as: 'ticket' });
// Satu tiket bisa dimiliki oleh banyak order detail
Ticket.hasMany(OrderDetail, { foreignKey: 'ticket_id', as: 'order_detail' });

// Satu event bisa punya banyak orang yang mengantri (waiting queue)
Event.hasMany(WaitingQueue, { foreignKey: 'event_id', as: 'waiting_queue' });
// Setiap antrian (waiting queue) merujuk ke satu event
WaitingQueue.belongsTo(Event, { foreignKey: 'event_id', as: 'event' });

// Satu lokasi bisa punya banyak venue
Location.hasMany(Venue, { foreignKey: 'location_id' });

// Setiap antrian tunggu juga terkait dengan satu user
WaitingQueue.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
// Dan satu user bisa berada dalam banyak waiting queue
User.hasMany(WaitingQueue, { foreignKey: 'user_id', as: 'waiting_queue' });

// Setiap pesanan (order) berhubungan dengan satu event
Order.belongsTo(Event, { foreignKey: 'event_id', as: 'event' });

// Setiap cart berisi satu tiket
Cart.belongsTo(Ticket, { foreignKey: 'ticket_id', as: 'ticket' });
// Dan satu tiket bisa masuk ke banyak cart
Ticket.hasMany(Cart, { foreignKey: 'ticket_id', as: 'carts' });

// Mengekspor semua model dan instance Sequelize agar bisa digunakan di file lain
module.exports = {
  sequelize,
  Cart,
  Category,  
  Event,
  Location,
  Order,
  OrderDetail,
  Payment,
  PromoCode,
  Ticket,
  User,
  Venue,
  WaitingQueue,
  Wishlist
};
