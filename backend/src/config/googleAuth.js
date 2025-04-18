const { google } = require('googleapis');
require('dotenv').config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const refreshAccessToken = async () => {
  try {
    oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

    const { credentials } = await oauth2Client.refreshAccessToken(); // Gunakan cara baru
    oauth2Client.setCredentials(credentials);

    console.log('Access token refreshed successfully');
  } catch (err) {
    console.error('Error refreshing access token:', err);
  }
};

refreshAccessToken();

const SCOPES = [
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/calendar'
];

module.exports = { oauth2Client, SCOPES };
