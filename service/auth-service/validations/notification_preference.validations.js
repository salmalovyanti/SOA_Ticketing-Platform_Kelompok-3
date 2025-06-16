const { body, validationResult } = require('express-validator');

// Skema validasi untuk mengedit preferensi notifikasi user
exports.updatePreference = [
  body().isObject().withMessage('Preferences must be a JSON object.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  }
];