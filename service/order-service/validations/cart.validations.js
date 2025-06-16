const Joi = require('joi');

// Skema validasi untuk menambahkan tiket ke keranjang
const addToCartSchema = Joi.object({
    // user_id: Joi.number().integer().required(),
    ticket_id: Joi.number().integer().required(),
    quantity: Joi.number().integer().min(1).required()
  });

// Skema validasi untuk melihat isi keranjang user
const getCartSchema = Joi.object({
  user_id: Joi.number().integer().required()
});
const checkoutSchema = Joi.object({
    payment_method: Joi.string().valid('credit card', 'bank transfer', 'e-wallet').required()
});

module.exports = { addToCartSchema, getCartSchema, checkoutSchema };