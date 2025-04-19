const express = require('express');
const router = express.Router();
const controller = require('./venue.controller');

// Endpoint untuk menampilkan seluruh data venue
router.get('/', controller.getAllVenues);
// Endpoint untuk menambahkan data venue
router.post('/', controller.createVenue);
// Endpoint untuk menampilkan satu data venue
router.get('/:id', controller.getVenueById);
// Endpoint untuk mengedit data venue
router.put('/:id', controller.updateVenue);
// Endpoint untuk menghapus data venue
router.delete('/:id', controller.deleteVenue);

module.exports = router;
