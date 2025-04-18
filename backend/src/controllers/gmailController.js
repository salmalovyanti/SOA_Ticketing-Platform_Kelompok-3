const { google } = require('googleapis');
const { oauth2Client } = require('../config/googleAuth');
const db = require('../config/database'); // koneksi db kamu (pastikan pakai async/await)
 
exports.sendMail = async (req, res) => {
  try {
    const orderId = req.params.id; // misalnya /send-mail/:id

    // Ambil data yang dibutuhkan dari database
    const [rows] = await db.execute(`
      SELECT u.email, e.event_name
      FROM orders o
      JOIN users u ON o.user_id = u.id
      JOIN events e ON o.event_id = e.id
      WHERE o.id = ?
    `, [orderId]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const { email, event_name } = rows[0];

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    const subject = `Pembelian Tiket ${event_name} Berhasil`;
    const body = `Terima kasih telah membeli tiket untuk event ${event_name}. Sampai jumpa di acara!`;

    const messageParts = [
      `To: ${email}`,
      `Subject: ${subject}`,
      'Content-Type: text/plain; charset="UTF-8"',
      'Content-Transfer-Encoding: 7bit',
      '',
      body,
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
