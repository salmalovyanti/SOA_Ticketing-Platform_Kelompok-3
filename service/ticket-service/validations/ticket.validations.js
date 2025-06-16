const Joi = require('joi');
const { body, validationResult } = require('express-validator');

// Skema validasi untuk menambahkan jenis tiket ke event
const createTicketSchema = Joi.object({
  event_id: Joi.number().integer().required(),
  ticket_type: Joi.string().valid('regular', 'vip', 'vvip').required(),
  price: Joi.number().precision(2).required(),
  stock: Joi.number().integer().required(),
  version_number: Joi.number().integer().optional(),
});

// Skema validasi untuk mengedit data tiket
const updateTicketSchema = Joi.object({
  event_id: Joi.number().integer(),
  ticket_type: Joi.string().valid('regular', 'vip', 'vvip'),
  price: Joi.number().precision(2),
  stock: Joi.number().integer(),
  version_number: Joi.number().integer(),
});

// Skema validasi untuk membeli tiket
const purchaseTicketSchema = Joi.object({
  user_id: Joi.number().integer().required(),
  event_id: Joi.number().integer().required(),
  ticket_id: Joi.number().integer().required(),
});

// Skema validasi untuk mengupload tiket dalam jumlah yang banyak
const validateBulkUploadTickets = [
  body('event_id')
    .notEmpty().withMessage('event_id wajib diisi')
    .isInt().withMessage('event_id harus berupa angka'),

  body('tickets')
    .isArray({ min: 1 }).withMessage('tickets harus berupa array dan minimal 1 item'),

  body('tickets.*.name')
    .notEmpty().withMessage('Nama tiket harus diisi'),

  body('tickets.*.price')
    .isFloat({ min: 0 }).withMessage('Harga tiket harus angka positif'),

  body('tickets.*.stock')
    .isInt({ min: 1 }).withMessage('Stok tiket harus lebih dari 0'),

  body('tickets.*.ticket_type')
    .isIn(['early_bird', 'regular', 'vip']).withMessage('Tipe tiket tidak valid'),

  // Middleware penanganan error validasi
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
];

// --- Export gabungan
module.exports = { createTicketSchema, updateTicketSchema, purchaseTicketSchema, validateBulkUploadTickets };