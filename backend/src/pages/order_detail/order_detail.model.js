const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

// Definisi model OrderDetail yang merepresentasikan tabel order_details di database
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

OrderDetail.getDetailsByOrderId = async function (orderId) {
  return await OrderDetail.findAll({
    where: { order_id: orderId },
    attributes: ['order_detail_id', 'quantity']
  });
};

OrderDetail.associate = (models) => {
    OrderDetail.belongsTo(models.Order, { foreignKey: 'order_id', as: 'order' });
    OrderDetail.belongsTo(models.Ticket, { foreignKey: 'ticket_id', as: 'ticket' });
    OrderDetail.hasMany(models.IssuedTicket, { foreignKey: 'order_detail_id', as: 'issued_tickets' });
  };

module.exports = OrderDetail;
