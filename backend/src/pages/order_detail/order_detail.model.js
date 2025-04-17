const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const OrderDetail = sequelize.define('OrderDetail', {
  order_detail_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  order_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  ticket_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  ticket_name: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ticket_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
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
  tableName: 'order_details',
  timestamps: false
});

module.exports = OrderDetail;
