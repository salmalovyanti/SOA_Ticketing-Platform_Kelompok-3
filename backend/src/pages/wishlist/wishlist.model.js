const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Wishlist = sequelize.define('Wishlist', {
  wishlist_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  event_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  }
}, {
  tableName: 'wishlists',
  timestamps: true,
  paranoid: true,
  underscored: true
});

module.exports = Wishlist;
