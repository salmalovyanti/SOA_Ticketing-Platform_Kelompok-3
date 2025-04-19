const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

// Definisi model Event yang merepresentasikan tabel events di database
const Event = sequelize.define('Event', {
  event_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  organizer_id: {
    type: DataTypes.BIGINT,
    allowNull: true
  },
  event_name: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  slug: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  event_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  location_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  category_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  total_tickets: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  venue_id: {
    type: DataTypes.BIGINT,
    allowNull: true
  },
  thumbnail_url: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  is_published: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false
  }
}, {
  tableName: 'events',
  timestamps: true,  // Menambahkan createdAt dan updatedAt secara otomatis
  paranoid: true,   // Mengaktifkan soft delete dengan kolom deletedAt
  underscored: true  // Gunakan format snake_case untuk nama kolom di database
});

module.exports = Event;
