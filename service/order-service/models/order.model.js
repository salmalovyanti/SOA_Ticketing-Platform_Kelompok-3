const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definisi model Order yang merepresentasikan tabel orders di database
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
  payment_url: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  payment_status: {
    type: DataTypes.ENUM('pending', 'successful', 'failed'),
    allowNull: true
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
    type: DataTypes.ENUM('pending', 'paid', 'cancelled', 'refunded'),
    allowNull: true
  }
}, {
  tableName: 'orders',
  timestamps: true,
  paranoid: true,
  underscored: true
});

module.exports = Order;