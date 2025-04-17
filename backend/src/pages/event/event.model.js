const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Event = sequelize.define('Event', {
  event_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  event_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  event_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  location_id: {
    type: DataTypes.BIGINT,
    allowNull: true
  },
  category_id: {
    type: DataTypes.BIGINT,
    allowNull: true
  },
  venue: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  total_tickets: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'events',
  timestamps: false // karena kamu punya created_at manual, bukan Sequelize default
});

module.exports = Event;
