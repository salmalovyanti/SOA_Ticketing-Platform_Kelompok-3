const db = require('../../config/database'); 
const { Event, Category, Venue, Location } = require('../../models'); 
const { Op } = require('sequelize');

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

exports.create = async (data) => {
  return await Event.create(data);
};

exports.getById = async (id) => {
  return await Event.findByPk(id); // atau findOne({ where: { event_id: id } }) kalau perlu
};

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
            where: { location_id: locationId } // pindahkan ke sini!
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