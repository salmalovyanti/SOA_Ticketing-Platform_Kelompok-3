const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Event = sequelize.define('Event', {
  event_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  organizer_id: {
    type: DataTypes.BIGINT,
    allowNull: true
  },
  event_name: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  slug: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  event_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  location_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  category_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  venue: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  total_tickets: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  venue_id: {
    type: DataTypes.BIGINT,
    allowNull: true
  },
  thumbnail_url: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  is_published: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false
  }
}, {
  tableName: 'events',
  timestamps: true,
  paranoid: true,
  underscored: true
});

module.exports = Event;
