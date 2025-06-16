const Joi = require('joi');

// Skema validasi untuk menambahkan user
const createUserSchema = Joi.object({
  name: Joi.string().max(100).required(),
  email: Joi.string().email().max(100).required(),
  password_hash: Joi.string().max(255).required(),
  phone: Joi.string().max(15).allow(null, ''),
  role: Joi.string().valid('admin', 'buyer').default('buyer')
});

// Skema validasi untuk mengedit data user
const updateUserSchema = Joi.object({
  name: Joi.string().max(100),
  email: Joi.string().email().max(100),
  password_hash: Joi.string().max(255),
  phone: Joi.string().max(15).allow(null, ''),
  role: Joi.string().valid('admin', 'buyer')
});

// Skema validasi untuk mengedit data profil user (hanya untuk data yang dapat dilihat user)
const updateUserProfileSchema = Joi.object({
  name: Joi.string().max(100),
  email: Joi.string().email().max(100),
  phone: Joi.string().max(15).allow(null, '')
});

module.exports = { createUserSchema, updateUserSchema, updateUserProfileSchema };