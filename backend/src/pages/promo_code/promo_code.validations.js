const Joi = require('joi');

 const promoCodeSchema = Joi.object({
  code: Joi.string().max(50).required(),
  discount_percentage: Joi.number().integer().min(1).max(100).required(),
  max_discount: Joi.number().precision(2).required(),
  start_date: Joi.date().required(),
  end_date: Joi.date().required(),
  quota: Joi.number().integer().min(1).required()
});

const redeemPromoSchema = Joi.object({
    promo_code: Joi.string().max(50).required(), // Kode promo yang digunakan
    order_id: Joi.number().integer().required(), // ID order yang mau ditebus promo-nya
    user_id: Joi.number().integer().required(), // ID user yang menggunakan promo
  });

module.exports = { promoCodeSchema, redeemPromoSchema };
