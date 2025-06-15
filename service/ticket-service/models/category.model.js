const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Event = require('./event.model');

// Definisi model Category yang merepresentasikan tabel categories di database
const Category = sequelize.define('Category', {
  category_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  category_name: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  slug: {
    type: DataTypes.STRING(100),
    allowNull: true,
  }
}, {
  tableName: 'categories',
  timestamps: true,
  paranoid: true,
  underscored: true
});

module.exports = Category;
