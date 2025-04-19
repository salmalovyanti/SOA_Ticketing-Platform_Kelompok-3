const express = require('express');
const router = express.Router();
const controller = require('./location.controller');

// Fitur menampilkan seluruh data lokasi
router.get('/', controller.getAllLocations);
// Fitur menambahkan lokasi
router.post('/', controller.createLocation);
// Fitur menampilkan satu lokasi
router.get('/:id', controller.getLocationById);
// Fitur mengedit lokasi
router.put('/:id', controller.updateLocation);
// Fitur menghapus lokasi
router.delete('/:id', controller.deleteLocation);

module.exports = router;
