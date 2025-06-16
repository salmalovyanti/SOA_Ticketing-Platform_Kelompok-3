const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definisi model Payment yang merepresentasikan tabel payments di database
const Payment = sequelize.define('Payment', {
  payment_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  order_id: {
    type: DataTypes.BIGINT,
    allowNull: true
  },
  payment_provider: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  payment_code: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  amount: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('pending', 'paid', 'failed'),
    allowNull: true,
    defaultValue: 'pending'
  },
  paid_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'payments',
  timestamps: false,  
  paranoid: true,     // Soft delete
  underscored: true
});

module.exports = Payment;