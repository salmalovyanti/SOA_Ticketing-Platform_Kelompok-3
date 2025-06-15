const Joi = require('joi');

// Skema validasi untuk membuat order
const createOrderSchema = Joi.object({
  user_id: Joi.number().required(),
  event_id: Joi.number().required(),
  total_price: Joi.number().required(),
  order_status: Joi.string().valid('pending', 'paid').default('pending'),
  order_details: Joi.array().items(
    Joi.object({
      ticket_id: Joi.number().required(),
      quantity: Joi.number().min(1).required()
    })
  )
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