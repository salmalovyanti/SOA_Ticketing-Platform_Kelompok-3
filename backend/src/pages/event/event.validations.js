const Joi = require('joi');

const createEventSchema = Joi.object({
  event_name: Joi.string().required(),
  description: Joi.string().allow('', null),
  event_date: Joi.date().required(),
  
});

module.exports = { createEventSchema };
