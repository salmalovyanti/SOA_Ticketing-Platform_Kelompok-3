const { google } = require('googleapis');
require('dotenv').config();
const readline = require('readline');

// Inisialisasi OAuth2Client
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Scope yang diperlukan
const SCOPES = [
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/calendar'
];

// Buat URL untuk auth
const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES,
  prompt: 'consent'
});

console.log('Authorize this app by visiting this url:', authUrl);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the code from that page here: ', async (code) => {
  rl.close();
  try {
    const { tokens } = await oauth2Client.getToken(code);
    console.log('\n✅ Token berhasil dibuat:');
    console.log(tokens);

    if (tokens.refresh_token) {
      console.log('\n🔑 Simpan refresh_token ini ke file .env kamu:');
      console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`);
    } else {
      console.warn('\n⚠️ Tidak ada refresh_token yang dikembalikan. Coba ulangi proses dengan `prompt: consent`.');
    }

  } catch (error) {
    console.error('❌ Error saat menukar code dengan token:', error.message);
  }
});