const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Event = require('../event/event.model');

const Category = sequelize.define('Category', {
  category_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  category_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'categories',
  timestamps: false
});

Category.hasMany(Event, {
  foreignKey: 'category_id',
  as: 'events'
});

module.exports = Category;
