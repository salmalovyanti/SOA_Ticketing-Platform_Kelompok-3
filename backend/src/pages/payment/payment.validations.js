const Joi = require('joi');

const cancelTicketSchema = Joi.object({
  user_id: Joi.number().integer().required(),
  payment_id: Joi.number().integer().required()
});

module.exports = { cancelTicketSchema };
