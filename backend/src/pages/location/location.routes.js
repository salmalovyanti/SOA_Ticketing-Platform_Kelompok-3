const express = require('express');
const router = express.Router();
const controller = require('./location.controller');

router.get('/', controller.getAllLocations);
router.post('/', controller.createLocation);
router.get('/:id', controller.getLocationById);
router.put('/:id', controller.updateLocation);
router.delete('/:id', controller.deleteLocation);

module.exports = router;
