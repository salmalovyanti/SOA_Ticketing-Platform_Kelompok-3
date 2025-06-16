const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const sequelize = require('../config/database');

const IssuedTicket = sequelize.define('IssuedTicket', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  order_detail_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  ticket_code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  is_used: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  used_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'issued_tickets',
  timestamps: true,
  underscored: true
});

module.exports = IssuedTicket;