const express = require('express');
const router = express.Router();
const controller = require('./user.controller');
const multer = require('multer');
const path = require('path');

// Konfigurasi penyimpanan avatar
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/avatars/');
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// upload avatar user
router.post('/:id/avatar', upload.single('avatar'), controller.uploadAvatar);

router.post('/', controller.createUser); // Create user
router.get('/', controller.getAllUsers);  // Get all users
router.get('/:id', controller.getUserById);  // Get user by id
router.put('/:id', controller.updateUser);  // Update user by id
router.delete('/:id', controller.deleteUser);  // Delete user by id
router.put('/:id/profile', controller.updateUserProfile);  // Update user profile

module.exports = router;
