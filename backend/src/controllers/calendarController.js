// Import OAuth2 client dari konfigurasi Google Auth
const { oauth2Client } = require('../config/googleAuth');
const { google } = require('googleapis');

// Handler untuk membuat event di Google Calendar
exports.createEvent = async (req, res) => {
  try {
    // Inisialisasi Google Calendar API dengan OAuth2 client yang sudah terautentikasi
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    // Buat objek event berdasarkan data dari request body
    const event = {
      summary: req.body.summary,           // Judul event
      location: req.body.location,         // Lokasi event
      description: req.body.description,   // Deskripsi event
      start: {
        dateTime: req.body.startDateTime,  // Waktu mulai event
        timeZone: 'Asia/Jakarta',          // Zona waktu Indonesia
      },
      end: {
        dateTime: req.body.endDateTime,    // Waktu selesai event
        timeZone: 'Asia/Jakarta',
      },
      attendees: req.body.attendees || [], // Daftar peserta (opsional)
    };

    // Kirim request ke Google Calendar API untuk membuat event di kalender utama
    const response = await calendar.events.insert({
      calendarId: 'primary',      // Gunakan kalender utama dari akun pengguna
      requestBody: event,         // Data event yang akan dikirim
    });

    // Jika berhasil, kirim respons dengan link ke event yang telah dibuat
    res.status(200).json({
      message: 'Event created successfully',
      eventLink: response.data.htmlLink, // Link ke Google Calendar
    });
  } catch (err) {
    // Tangani error jika terjadi kegagalan
    console.error('CREATE EVENT ERROR:', err);
    res.status(500).json({
      error: 'Failed to create event',      // Pesan umum
      details: err.message || err,          // Detail error untuk debugging
    });
  }
};