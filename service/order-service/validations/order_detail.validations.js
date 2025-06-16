const Joi = require('joi');

// Skema validasi untuk membuat order detail
const createOrderDetailSchema = Joi.object({
  order_id: Joi.number().required(),
  ticket_id: Joi.number().required(),
  ticket_name: Joi.string().optional(),
  quantity: Joi.number().required(),
  ticket_price: Joi.number().precision(2).required(),
  subtotal: Joi.number().precision(2).required()
});

module.exports = { createOrderDetailSchema };