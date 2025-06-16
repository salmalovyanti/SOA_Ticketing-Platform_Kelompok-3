const Joi = require('joi');

// Skema validasi untuk menambahkan lokasi
const createLocationSchema = Joi.object({
  location_name: Joi.string().max(255).required()
});

// Skema validasi untuk mengedit lokasi
const updateLocationSchema = Joi.object({
  location_name: Joi.string().max(255).optional()
});

module.exports = { createLocationSchema, updateLocationSchema };