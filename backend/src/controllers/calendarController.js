const { oauth2Client } = require('../src/config/googleAuth');
const { google } = require('googleapis');

exports.createEvent = async (req, res) => {
  try {
    // Tidak perlu ambil dari header, langsung pakai oauth2Client yang sudah punya refresh_token
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const event = {
      summary: req.body.summary,
      location: req.body.location,
      description: req.body.description,
      start: {
        dateTime: req.body.startDateTime,
        timeZone: 'Asia/Jakarta',
      },
      end: {
        dateTime: req.body.endDateTime,
        timeZone: 'Asia/Jakarta',
      },
      attendees: req.body.attendees || [],
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
    });

    res.status(200).json({
      message: 'Event created successfully',
      eventLink: response.data.htmlLink,
    });
  } catch (err) {
    console.error('CREATE EVENT ERROR:', err);
    res.status(500).json({
      error: 'Failed to create event',
      details: err.message || err,
    });
  }
};
