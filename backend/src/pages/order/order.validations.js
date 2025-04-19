const Joi = require('joi');

// Skema validasi untuk membuat order
const createOrderSchema = Joi.object({
  order_date: Joi.date().required(),
  quantity: Joi.number().integer().required(),
  total_price: Joi.number().required(),
  customer_name: Joi.string().required(),
  event_id: Joi.number().integer().required(),
});

// Skema validasi untuk mengedit data order
const updateOrderSchema = Joi.object({
  quantity: Joi.number().integer(),
  total_price: Joi.number(),
  customer_name: Joi.string(),
  event_id: Joi.number().integer(),
});

// Skema validasi untuk mengajukan refund tiket
const refundOrderSchema = Joi.object({
  order_id: Joi.number().integer().required(),
  reason: Joi.string().max(500).required()
});

module.exports = { createOrderSchema, updateOrderSchema, refundOrderSchema };
