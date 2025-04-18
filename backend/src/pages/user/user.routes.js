const express = require('express');
const router = express.Router();
const controller = require('./user.controller');

router.post('/', controller.createUser); //
router.get('/', controller.getAllUsers);
router.get('/:id', controller.getUserById);
router.put('/:id', controller.updateUser);
router.delete('/:id', controller.deleteUser);
router.put('/:id/profile', controller.updateUserProfile);


module.exports = router;
