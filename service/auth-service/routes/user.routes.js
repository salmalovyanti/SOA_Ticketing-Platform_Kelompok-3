const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');
const multer = require('multer');
const path = require('path');
const { authenticateToken } = require('../middleware/authMiddleware');

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

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Manajemen data pengguna
 */

// Endpoint untuk mengupload foto profil user
/**
 * @swagger
 * /users/{id}/avatar:
 *   post:
 *     summary: Upload foto profil user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Upload berhasil
 */
router.post('/:id/avatar', upload.single('avatar'), authenticateToken, controller.uploadAvatar);


// Endpoint untuk menambahkan user
router.post('/', authenticateToken, controller.createUser);


// Endpoint untuk menampilkan seluruh data user
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Ambil semua data user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daftar user
 */
router.get('/', authenticateToken, controller.getAllUsers);


// Endpoint untuk menampilkan satu data user
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Ambil user berdasarkan ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Data user ditemukan
 */
router.get('/:id', authenticateToken, controller.getUserById);

// Endpoint untuk mengedit data user
router.put('/:id', authenticateToken, controller.updateUser);

// Endpoint untuk menghapus data user
router.delete('/:id', authenticateToken, controller.deleteUser);

// Endpoint untuk mengedit data profil user (hanya untuk data yang dapat dilihat user)
router.put('/:id/profile', authenticateToken, controller.updateUserProfile);

module.exports = router;