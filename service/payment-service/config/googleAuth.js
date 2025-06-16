// Mengimpor modul googleapis untuk mengakses Google API dan dotenv untuk mengelola variabel lingkungan
const { google } = require('googleapis');
require('dotenv').config();

// Membuat instance OAuth2Client dari Google API menggunakan kredensial yang disediakan di .env
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Fungsi untuk menyegarkan (refresh) token akses menggunakan refresh token
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

// Menjalankan fungsi untuk menyegarkan token akses ketika modul ini dijalankan
refreshAccessToken();

// Menentukan scopes yang diperlukan untuk akses ke Google API (Gmail dan Calendar)
const SCOPES = [
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/calendar'
];

module.exports = { oauth2Client, SCOPES };