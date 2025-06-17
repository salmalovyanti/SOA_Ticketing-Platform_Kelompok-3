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
 * /api/users/{id}/avatar:
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
/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Tambah user baru
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User berhasil dibuat
 */
router.post('/', authenticateToken, controller.createUser);


// Endpoint untuk menampilkan seluruh data user
/**
 * @swagger
 * /api/users:
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
 * /api/users/{id}:
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
/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update data user (admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Data user berhasil diperbarui
 */
router.put('/:id', authenticateToken, controller.updateUser);

// Endpoint untuk menghapus data user
/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update data user (admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Data user berhasil diperbarui
 */
router.put('/:id', authenticateToken, controller.updateUser);

// Endpoint untuk menghapus data user
/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Hapus user berdasarkan ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User berhasil dihapus
 */
router.delete('/:id', authenticateToken, controller.deleteUser);

// Endpoint untuk mengedit data profil user (hanya untuk data yang dapat dilihat user)
/**
 * @swagger
 * /api/users/{id}/profile:
 *   put:
 *     summary: Update profil user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profil user berhasil diperbarui
 */
router.put('/:id/profile', authenticateToken, controller.updateUserProfile);

module.exports = router;