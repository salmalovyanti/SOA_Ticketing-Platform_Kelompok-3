const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const WaitingQueue = sequelize.define('WaitingQueue', {
  queue_id: {
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
  },
  status: {
    type: DataTypes.ENUM('waiting', 'processing', 'completed'),
    defaultValue: 'waiting'
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'waiting_queue',
  timestamps: false
});

module.exports = WaitingQueue;
