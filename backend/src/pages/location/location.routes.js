const express = require('express');
const router = express.Router();
const controller = require('./location.controller');
const { authenticateToken } = require('../../middleware/authMiddleware');

// Endpoint untuk menampilkan seluruh data lokasi
router.get('/', controller.getAllLocations);
// Endpoint untuk menambahkan lokasi
router.post('/', authenticateToken, controller.createLocation);
// Endpoint untuk menampilkan satu lokasi
router.get('/:id', controller.getLocationById);
// Endpoint untuk mengedit lokasi
router.put('/:id', authenticateToken, controller.updateLocation);
// Endpoint untuk menghapus lokasi
router.delete('/:id', authenticateToken, controller.deleteLocation);

module.exports = router;
