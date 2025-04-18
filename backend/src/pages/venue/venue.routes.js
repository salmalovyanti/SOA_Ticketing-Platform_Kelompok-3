const express = require('express');
const router = express.Router();
const controller = require('./venue.controller');

router.get('/', controller.getAllVenues);
router.post('/', controller.createVenue);
router.get('/:id', controller.getVenueById);
router.put('/:id', controller.updateVenue);
router.delete('/:id', controller.deleteVenue);

module.exports = router;
