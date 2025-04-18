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
    allowNull: true
  },
  ticket_id: {
    type: DataTypes.BIGINT,
    allowNull: true
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
  }
}, {
  tableName: 'order_details',
  timestamps: true,
  paranoid: true,
  underscored: true
});

module.exports = OrderDetail;
