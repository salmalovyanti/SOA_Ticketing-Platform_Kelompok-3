const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

// Definisi model WaitingQueue yang merepresentasikan tabel waiting_queues di database
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
  }
}, {
  tableName: 'waiting_queue',
  timestamps: true,
  paranoid: true,
  underscored: true
});

module.exports = WaitingQueue;
