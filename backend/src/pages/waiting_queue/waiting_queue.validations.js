const Joi = require('joi');

// Skema validasi untuk menambahkan data antrian
const createWaitingQueueSchema = Joi.object({
  user_id: Joi.number().required(),
  event_id: Joi.number().required(),
  status: Joi.string().valid('waiting', 'processing', 'completed').optional()
});

module.exports = { createWaitingQueueSchema };
