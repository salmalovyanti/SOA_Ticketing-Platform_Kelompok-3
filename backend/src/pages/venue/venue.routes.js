const express = require('express');
const router = express.Router();
const controller = require('./venue.controller');

// Fitur menampilkan seluruh data venue
router.get('/', controller.getAllVenues);
// Fitur menambahkan data venue
router.post('/', controller.createVenue);
// Fitur menampilkan satu data venue
router.get('/:id', controller.getVenueById);
// Fitur mengedit data venue
router.put('/:id', controller.updateVenue);
// Fitur menghapus data venue
router.delete('/:id', controller.deleteVenue);

module.exports = router;
