// Mengimpor koneksi ke database (Sequelize instance)
const sequelize = require('../config/database');

// Mengimpor semua model yang digunakan di aplikasi
const Category = require('../models/category.model');
const Event = require('../models/event.model');
const Location = require('../models/location.model');
const Ticket = require('../models/ticket.model');
const Venue = require('../models/venue.model');
// const IssuedTicket = require('./issuedticket');

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

// Satu lokasi bisa punya banyak venue
Location.hasMany(Venue, { foreignKey: 'location_id' });

// Mengekspor semua model dan instance Sequelize agar bisa digunakan di file lain
module.exports = {
  Category,  
  Event,
  Location,
  Ticket,
  Venue,
//   IssuedTicket
};