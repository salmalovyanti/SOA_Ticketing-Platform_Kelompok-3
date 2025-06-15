const Joi = require('joi');

// Skema validasi untuk membatalkan pembelian tiket
const cancelTicketSchema = Joi.object({
  user_id: Joi.number().integer().required(),
  payment_id: Joi.number().integer().required()
});

module.exports = { cancelTicketSchema };
