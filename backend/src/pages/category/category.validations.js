const Joi = require('joi');

const createCategorySchema = Joi.object({
  category_name: Joi.string().required()
});

// Dipisah agar tidak perlu required di semua field
const updateCategorySchema = Joi.object({
  category_name: Joi.string().optional()
});

module.exports = { createCategorySchema, updateCategorySchema };
