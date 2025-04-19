const { body, validationResult } = require('express-validator');

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