const express = require('express');
const router = express.Router();
const controller = require('../controllers/venue.controller');
const { authenticateToken } = require('../middleware/authMiddleware');

// Endpoint untuk menampilkan seluruh data venue
router.get('/', controller.getAllVenues);
// Endpoint untuk menambahkan data venue
router.post('/', authenticateToken, controller.createVenue);
// Endpoint untuk menampilkan satu data venue
router.get('/:id', controller.getVenueById);
// Endpoint untuk mengedit data venue
router.put('/:id', authenticateToken, controller.updateVenue);
// Endpoint untuk menghapus data venue
router.delete('/:id', authenticateToken, controller.deleteVenue);

module.exports = router;