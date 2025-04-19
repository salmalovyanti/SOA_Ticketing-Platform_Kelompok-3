const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

// Definisi model Ticket yang merepresentasikan tabel tickets di database
const Ticket = sequelize.define('Ticket', {
  ticket_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  event_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  ticket_type: {
    type: DataTypes.ENUM('early_bird', 'regular', 'vip'),
    allowNull: true
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  sold: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  version_number: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  }
}, {
  tableName: 'tickets',
  timestamps: true,
  paranoid: true,
  underscored: true
});


module.exports = Ticket;
