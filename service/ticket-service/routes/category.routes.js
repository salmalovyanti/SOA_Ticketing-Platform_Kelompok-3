/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Kategori Event
 */
const express = require('express');
const router = express.Router();
const controller = require('../controllers/category.controller');
const { authenticateToken } = require('../middleware/authMiddleware');

// Endpoint untuk menampilkan keseluruhan kategori event
/**
 * @swagger
 * /category:
 *   get:
 *     summary: Ambil semua kategori event
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Berhasil mengambil kategori
 */
router.get('/', controller.getAllCategories);

// Endpoint untuk menambahkan kategori event
/**
 * @swagger
 * /category:
 *   post:
 *     summary: Tambah kategori event
 *     tags: [Category]
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
 *     responses:
 *       201:
 *         description: Kategori berhasil ditambahkan
 */
router.post('/', authenticateToken, controller.createCategory);

// Endpoint untuk melihat satu kategori event
/**
 * @swagger
 * /category/{id}:
 *   get:
 *     summary: Ambil detail kategori event
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detail kategori ditemukan
 */
router.get('/:id', controller.getCategoryById);

// Endpoint untuk mengedit kategori event
/**
 * @swagger
 * /category/{id}:
 *   put:
 *     summary: Update kategori event
 *     tags: [Category]
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
 *     responses:
 *       200:
 *         description: Kategori berhasil diperbarui
 */
router.put('/:id', authenticateToken, controller.updateCategory);

// Endpoint untuk menghapus satu kategori event
/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: Hapus kategori event
 *     tags: [Category]
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
 *         description: Kategori berhasil dihapus
 */
router.delete('/:id', authenticateToken, controller.deleteCategory);

module.exports = router;