const express = require('express');
const router = express.Router();
const controller = require('./event.controller');

const ticketController = require('../ticket/ticket.controller')

// Fitur menampilkan seluruh data event
router.get('/', controller.getAllEvents);
// Fitur menambahkan event
router.post('/', controller.createEvent);
// Fitur melihat event berdasarkan nama kategori
router.get('/category/:id', controller.getByCategory);
// Fitur melihat event berdasarkan lokasi
router.get('/location/:id', controller.getByLocation);
// Fitur melihat tiket berdasarkan satu event
router.get('/:eventId/ticket', ticketController.getByEventId); 
// Fitur mencari event berdasarkan nama event
router.get('/search', controller.searchEvents);
// fitur melihat detail event
router.get('/:id', controller.getEventById);
// Fitur update detail event
router.put('/:id', controller.updateEvent);
// Fitur menghapus event
router.delete('/:id', controller.deleteEvent);


module.exports = router;
