const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Venue = sequelize.define('Venue', {
  venue_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  location_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  venue_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  venue_city: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  html_embed: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'venues',
  timestamps: false
});

module.exports = Venue;
