const Joi = require('joi');

const addToCartSchema = Joi.object({
    user_id: Joi.number().integer().required(),
    ticket_id: Joi.number().integer().required(),
    quantity: Joi.number().integer().min(1).required()
  });

const getCartSchema = Joi.object({
  user_id: Joi.number().integer().required()
});
const checkoutSchema = Joi.object({
    payment_method: Joi.string().valid('credit card', 'bank transfer', 'e-wallet').required()
});

module.exports = { addToCartSchema, getCartSchema, checkoutSchema };
