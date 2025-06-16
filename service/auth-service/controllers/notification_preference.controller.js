const notificationPreferenceService = require('../services/notification_preference.service');

// Handler untuk mengedit preferensi notifikasi user
exports.updatePreference = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const preferenceData = req.body;

    const updated = await notificationPreferenceService.updateUserPreference(userId, preferenceData);

    return res.status(200).json({
      success: true,
      message: 'Notification preferences updated successfully.',
      data: updated
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};