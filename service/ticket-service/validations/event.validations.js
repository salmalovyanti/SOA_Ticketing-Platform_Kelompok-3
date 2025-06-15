const Joi = require('joi');

// Skema validasi untuk membuat event baru
const createEventSchema = Joi.object({
  event_name: Joi.string().required(),
  description: Joi.string().allow('', null),
  event_date: Joi.date().required(),
  
});

module.exports = { createEventSchema };
