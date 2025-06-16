const Joi = require('joi');

// Skema validasi untuk menambahkan kode promo
 const promoCodeSchema = Joi.object({
  code: Joi.string().max(50).required(),
  discount_percentage: Joi.number().integer().min(1).max(100).required(),
  max_discount: Joi.number().precision(2).required(),
  start_date: Joi.date().required(),
  end_date: Joi.date().required(),
  quota: Joi.number().integer().min(1).required()
});

// Skema validasi untuk menggunakan kode promo saat melakukan pembelian
const redeemPromoSchema = Joi.object({
    promo_code: Joi.string().max(50).required(),
    order_id: Joi.number().integer().required(),
    user_id: Joi.number().integer().required(),
  });

module.exports = { promoCodeSchema, redeemPromoSchema };