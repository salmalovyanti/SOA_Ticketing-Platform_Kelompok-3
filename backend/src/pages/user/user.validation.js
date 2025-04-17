const Joi = require('joi');

const createUserSchema = Joi.object({
  name: Joi.string().max(100).required(),
  email: Joi.string().email().max(100).required(),
  password_hash: Joi.string().max(255).required(),
  phone: Joi.string().max(15).allow(null, ''),
  role: Joi.string().valid('admin', 'buyer').default('buyer')
});

const updateUserSchema = Joi.object({
  name: Joi.string().max(100),
  email: Joi.string().email().max(100),
  password_hash: Joi.string().max(255),
  phone: Joi.string().max(15).allow(null, ''),
  role: Joi.string().valid('admin', 'buyer')
});

module.exports = { createUserSchema, updateUserSchema };
