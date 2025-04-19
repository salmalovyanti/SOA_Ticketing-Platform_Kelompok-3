const fs = require('fs');
const path = require('path');
const preferencesPath = path.join(__dirname, 'preferenceStore.json');

exports.updateUserPreference = async (userId, preferenceData) => {
  let preferences = {};

  if (fs.existsSync(preferencesPath)) {
    preferences = JSON.parse(fs.readFileSync(preferencesPath, 'utf-8'));
  }

  preferences[userId] = preferenceData;

  fs.writeFileSync(preferencesPath, JSON.stringify(preferences, null, 2));

  return preferences[userId];
};
