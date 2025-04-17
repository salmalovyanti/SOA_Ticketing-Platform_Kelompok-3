const Joi = require('joi');

const createTicketSchema = Joi.object({
  event_id: Joi.number().integer().required(),
  ticket_type: Joi.string().valid('regular', 'vip', 'vvip').required(),
  price: Joi.number().precision(2).required(),
  stock: Joi.number().integer().required(),
  version_number: Joi.number().integer().optional(),
});

const updateTicketSchema = Joi.object({
  event_id: Joi.number().integer(),
  ticket_type: Joi.string().valid('regular', 'vip', 'vvip'),
  price: Joi.number().precision(2),
  stock: Joi.number().integer(),
  version_number: Joi.number().integer(),
});

module.exports = { createTicketSchema, updateTicketSchema };
