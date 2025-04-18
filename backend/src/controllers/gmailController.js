const { google } = require('googleapis');
const { oauth2Client } = require('../config/googleAuth');

exports.sendMail = async (req, res) => {
  try {
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    const messageParts = [
      `To: ${req.body.to}`,
      `Subject: ${req.body.subject}`,
      'Content-Type: text/plain; charset="UTF-8"',
      'Content-Transfer-Encoding: 7bit',
      '',
      req.body.message,
    ];

    const rawMessage = Buffer.from(messageParts.join('\r\n'))
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    const response = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: rawMessage,
      },
    });

    res.status(200).json({ message: 'Email sent', data: response.data });
  } catch (err) {
    console.error('SEND MAIL ERROR:', err.response?.data || err.message);
    res.status(500).json({
      error: 'Failed to send email',
      details: err.response?.data || err.message
    });
  }
};
