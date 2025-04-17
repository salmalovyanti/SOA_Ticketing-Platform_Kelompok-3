const sequelize = require('../config/database');
const Event = require('../pages/event/event.model');
const Category = require('../pages/category/category.model');
const Venue = require('../pages/venue/venue.model');
const Location = require('../pages/location/location.model');

// ASSOCIATIONS
Category.hasMany(Event, { foreignKey: 'category_id' });
Event.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });
Event.belongsTo(Venue, { foreignKey: 'venue_id', as: 'venue' });
Venue.belongsTo(Location, { foreignKey: 'location_id', as: 'location' });

module.exports = {
  sequelize,
  Event,
  Category,
  Venue,
  Location
};
