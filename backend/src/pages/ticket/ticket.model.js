const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Ticket = sequelize.define('Ticket', {
  ticket_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  event_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  ticket_type: {
    type: DataTypes.ENUM('regular', 'vip', 'vvip'),
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  version_number: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'tickets',
  timestamps: false
});

module.exports = Ticket;
