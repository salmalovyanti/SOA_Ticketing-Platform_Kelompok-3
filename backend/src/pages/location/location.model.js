const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Location = sequelize.define('Location', {
  location_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  city: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  province: {
    type: DataTypes.STRING(100),
    allowNull: true
  }
}, {
  tableName: 'locations',
  timestamps: false
});

module.exports = Location;
