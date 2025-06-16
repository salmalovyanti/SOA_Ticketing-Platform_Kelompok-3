const Joi = require('joi');

// Skema validasi untuk menambahkan kategori event
const createCategorySchema = Joi.object({
  category_name: Joi.string().required()
});

// Skema validasi untuk mengedit kategori event
const updateCategorySchema = Joi.object({
  category_name: Joi.string().optional()
});

module.exports = { createCategorySchema, updateCategorySchema };