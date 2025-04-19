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

// Endpoint untuk mengupload foto profil user
router.post('/:id/avatar', upload.single('avatar'), controller.uploadAvatar);
// Endpoint untuk menambahkan user
router.post('/', controller.createUser);
// Endpoint untuk menampilkan seluruh data user
router.get('/', controller.getAllUsers);
// Endpoint untuk menampilkan satu data user
router.get('/:id', controller.getUserById);
// Endpoint untuk mengedit data user
router.put('/:id', controller.updateUser);
// Endpoint untuk menghapus data user
router.delete('/:id', controller.deleteUser);
// Endpoint untuk mengedit data profil user (hanya untuk data yang dapat dilihat user)
router.put('/:id/profile', controller.updateUserProfile);

module.exports = router;
