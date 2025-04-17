const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Event = require('../event/event.model');

const Order = sequelize.define('Order', {
  order_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  event_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  total_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  payment_method: {
    type: DataTypes.ENUM('credit_card', 'bank_transfer', 'ewallet'),
    allowNull: true
  },
  payment_status: {
    type: DataTypes.ENUM('pending', 'successful', 'failed'),
    defaultValue: 'pending'
  },
  paid_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  expired_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  order_status: {
    type: DataTypes.ENUM('pending', 'paid', 'cancelled'),
    defaultValue: 'pending'
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'orders',
  timestamps: false
});

// Relasi ke Event
Order.belongsTo(Event, {
  foreignKey: 'event_id',
  as: 'event'
});

module.exports = Order;
