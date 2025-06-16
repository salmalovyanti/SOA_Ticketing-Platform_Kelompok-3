const db = require('../config/database'); 
const { Event, Category, Venue, Location } = require('../models');
const { Op } = require('sequelize');

// Mengambil semua event dengan relasi kategori dan venue
exports.getAll = async () => {
  return await Event.findAll({
    include: [
      {
        model: Category,
        as: 'category',
        attributes: ['category_name']
      },
      {
        model: Venue,
        as: 'venue',
        attributes: ['venue_name', 'venue_city', 'address', 'html_embed'],
        include: {
          model: Location,
          as: 'location',
          attributes: ['location_name']
        }
      }
    ]
  });
};

// Membuat event baru menggunakan data dari request body
exports.create = async (data) => {
  return await Event.create(data);
};

// Mengambil satu event berdasarkan primary key (event_id)
exports.getById = async (id) => {
  return await Event.findByPk(id); 
};

// Mengambil semua event berdasarkan category_id tertentu
exports.getByCategory = async (categoryId) => {
  return await Event.findAll({
    where: { category_id: categoryId },
    include: [{
      model: Category,
      as: 'category', // ini penting!
      attributes: ['category_name'] // opsional, tapi biasanya dipakai
    }]
  });
};

// Mengambil semua event berdasarkan location_id 
exports.getByLocation = async (locationId) => {
  return await Event.findAll({
    include: [
      {
        model: Venue,
        as: 'venue',
        attributes: ['venue_name', 'venue_city', 'html_embed'],
        include: [
          {
            model: Location,
            as: 'location',
            attributes: ['location_name'],
            where: { location_id: locationId } 
          }
        ]
      },
      {
        model: Category,
        as: 'category',
        attributes: ['category_name']
      }
    ]
  });
};

// Mencari event berdasarkan keyword di nama event
exports.searchEvents = async (keyword) => {
  return await Event.findAll({
    where: {
      event_name: {
        [Op.like]: `%${keyword}%` // mencari event_name yang mengandung keyword
      }
    },
    include: [
      {
        model: Venue,
        as: 'venue',
        required: false,  // false selama data venue ada yang NULL
        include: [
          {
            model: Location,
            as: 'location', 
            required: false
          }
        ]
      },
      {
        model: Category,
        as: 'category',
        attributes: ['category_name'] // menampilkan nama kategori
      }
    ]
  });
};

// Mengupdate event data event berdasarkan event_id
exports.update = async (id, data) => {
  const event = await Event.findByPk(id);
  if (!event) return null;
  await event.update(data);
  return event;
};

// Menghapus event berdasarkan event_id
exports.delete = async (id) => {
  const deletedCount = await Event.destroy({
    where: { event_id: id }
  });

  return deletedCount > 0;
};