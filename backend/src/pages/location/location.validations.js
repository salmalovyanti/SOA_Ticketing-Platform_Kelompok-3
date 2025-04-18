const Joi = require('joi');

const createLocationSchema = Joi.object({
  location_name: Joi.string().max(255).required()
});

const updateLocationSchema = Joi.object({
  location_name: Joi.string().max(255).optional()
});

module.exports = { createLocationSchema, updateLocationSchema };
