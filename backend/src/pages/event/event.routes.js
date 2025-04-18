const express = require('express');
const router = express.Router();
const controller = require('./event.controller');

const ticketController = require('../ticket/ticket.controller')

router.get('/', controller.getAllEvents); //
router.post('/', controller.createEvent);
// events berdasarkan nama category
router.get('/category/:id', controller.getByCategory);
// events berdasarkan nama location
router.get('/location/:id', controller.getByLocation);
// page ticket berdasarkan event
router.get('/:eventId/ticket', ticketController.getByEventId); 
// fitur search events berdasarkan nama event
router.get('/search', controller.searchEvents);
// page detail events
router.get('/:id', controller.getEventById);
router.delete('/:id', controller.deleteEvent);


module.exports = router;
