const { google } = require('googleapis');
const { oauth2Client } = require('../config/googleAuth');
const db = require('../config/db'); // Pastikan koneksi DB kamu support async/await

// Controller untuk mengirim email konfirmasi pembelian tiket
exports.sendMail = async (req, res) => {
  try {
    const orderId = req.params.id; // Ambil ID order dari parameter URL, misalnya /send-mail/:id

    // Ambil data user dan event terkait dari database berdasarkan ID order
    const [rows] = await db.execute(`
      SELECT u.email, e.event_name
      FROM orders o
      JOIN users u ON o.user_id = u.id
      JOIN events e ON o.event_id = e.id
      WHERE o.id = ?
    `, [orderId]);

    // Jika tidak ada data, kirim respons 404
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const { email, event_name } = rows[0]; // Ambil email dan nama event

    // Inisialisasi Google Gmail API
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    // Siapkan isi email
    const subject = `Pembelian Tiket ${event_name} Berhasil`;
    const body = `Terima kasih telah membeli tiket untuk event ${event_name}. Sampai jumpa di acara!`;

    // Format email sesuai standar MIME
    const messageParts = [
      `To: ${email}`,
      `Subject: ${subject}`,
      'Content-Type: text/plain; charset="UTF-8"',
      'Content-Transfer-Encoding: 7bit',
      '',
      body,
    ];

    // Encode email ke dalam format base64 URL-safe
    const rawMessage = Buffer.from(messageParts.join('\r\n'))
      .toString('base64')
      .replace(/\+/g, '-') // Gmail API butuh format URL-safe
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    // Kirim email menggunakan Gmail API
    const response = await gmail.users.messages.send({
      userId: 'me', // 'me' berarti akun yang sedang login (pakai oauth2Client)
      requestBody: {
        raw: rawMessage,
      },
    });

    // Jika sukses, kirim respons OK
    res.status(200).json({ message: 'Email sent', data: response.data });

  } catch (err) {
    // Tangani error jika gagal kirim email
    console.error('SEND MAIL ERROR:', err.response?.data || err.message);
    res.status(500).json({
      error: 'Failed to send email',
      details: err.response?.data || err.message,
    });
  }
};