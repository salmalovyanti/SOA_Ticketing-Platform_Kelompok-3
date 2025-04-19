const express = require('express');
const router = express.Router();
const controller = require('./event.controller');

const ticketController = require('../ticket/ticket.controller')

// Endpoint untuk menampilkan seluruh data event
router.get('/', controller.getAllEvents);
// Endpoint untuk menambahkan event
router.post('/', controller.createEvent);
// Endpoint untuk melihat event berdasarkan nama kategori
router.get('/category/:id', controller.getByCategory);
// Endpoint untuk melihat event berdasarkan lokasi
router.get('/location/:id', controller.getByLocation);
// Endpoint untuk melihat tiket berdasarkan satu event
router.get('/:eventId/ticket', ticketController.getByEventId); 
// Endpoint untuk mencari event berdasarkan nama event
router.get('/search', controller.searchEvents);
// Endpoint untuk melihat detail event
router.get('/:id', controller.getEventById);
// Endpoint untuk update detail event
router.put('/:id', controller.updateEvent);
// Endpoint untuk menghapus event
router.delete('/:id', controller.deleteEvent);


module.exports = router;
