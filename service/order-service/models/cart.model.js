const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definisi model Cart yang merepresentasikan tabel carts di database
const Cart = sequelize.define('Cart', {
  cart_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  ticket_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'carts',
  timestamps: true,
  paranoid: true,
  underscored: true
});

module.exports = Cart;