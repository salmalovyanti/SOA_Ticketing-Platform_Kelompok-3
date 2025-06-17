const express = require('express');
const router = express.Router();
const controller = require('../controllers/notification_preference.controller');
const validate = require('../validations/notification_preference.validations');
const { authenticateToken } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Notification Preferences
 *   description: Preferensi notifikasi pengguna
 */



// Endpoint untuk mengedit preferensi notifikasi user
/**
 * @swagger
 * /notification-preferences:
 *   post:
 *     summary: Perbarui preferensi notifikasi pengguna
 *     tags: [Notification Preferences]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email_notification:
 *                 type: boolean
 *               push_notification:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Preferensi berhasil diperbarui
 *       400:
 *         description: Validasi gagal
 *       401:
 *         description: Tidak terautentikasi
 *       500:
 *         description: Server error
 */
router.post('/', authenticateToken, validate.updatePreference, controller.updatePreference);

module.exports = router;