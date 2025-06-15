const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definisi model PromoCode yang merepresentasikan tabel promo_codes di database
const PromoCode = sequelize.define('PromoCode', {
  promo_codes_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  code: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  discount_percentage: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  max_discount: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  quota: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'promo_codes',
  timestamps: false,
  paranoid: true,
  underscored: true
});

module.exports = PromoCode;
