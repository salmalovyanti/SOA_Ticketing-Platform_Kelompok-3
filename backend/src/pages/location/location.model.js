const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Location = sequelize.define('Location', {
  location_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  location_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: 'locations',
  timestamps: true,
  paranoid: true,
  underscored: true
});

module.exports = Location;

