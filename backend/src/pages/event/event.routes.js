const express = require('express');
const router = express.Router();
const controller = require('./event.controller');

router.get('/', controller.getAllEvents);
router.post('/', controller.createEvent);
router.get('/category/:id', controller.getByCategory); // harus di atas
router.get('/location/:id', controller.getByLocation);
router.get('/:id', controller.getEventById);


module.exports = router;
