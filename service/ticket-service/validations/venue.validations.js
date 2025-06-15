const Joi = require('joi');

// Skema validasi untuk menambahkan data venue
const createVenueSchema = Joi.object({
  location_id: Joi.number().required(),
  venue_name: Joi.string().required(),
  venue_city: Joi.string().allow('', null),
  address: Joi.string().allow('', null),
  html_embed: Joi.string().allow('', null)
});

// Skema validasi untuk mengedit data venue
const updateVenueSchema = Joi.object({
  location_id: Joi.number().optional(),
  venue_name: Joi.string().optional(),
  venue_city: Joi.string().allow('', null).optional(),
  address: Joi.string().allow('', null).optional(),
  html_embed: Joi.string().allow('', null).optional()
});

module.exports = { createVenueSchema, updateVenueSchema };
