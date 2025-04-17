const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// CRUD
router.get('/', eventController.getAllEvents);
router.post('/', eventController.createEvent);
router.get('/:event_id', eventController.getEventById);
router.put('/:event_id', eventController.updateEvent);
router.delete('/:event_id', eventController.deleteEvent);

// Custom
router.get('/category/:category_id', eventController.getEventsByCategory);
router.get('/grouped/by-category', eventController.getGroupedByCategory);

module.exports = router;
