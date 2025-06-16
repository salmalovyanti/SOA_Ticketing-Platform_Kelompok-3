const { google } = require('googleapis');
const { oauth2Client } = require('../config/googleAuth');

exports.sendOrderConfirmationEmail = async (email, eventName, orderId, qrBase64Array) => {
  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

  const subject = `Pembelian Tiket ${eventName} Berhasil`;
  const body = `Terima kasih telah membeli tiket untuk event *${eventName}*.\n\nSilakan scan QR di lampiran ini saat memasuki venue.`;

  // Boundary email multipart
  const boundary = 'boundary_string';

  // Bagian body plain text
  const messageParts = [
    'Content-Type: multipart/mixed; boundary="' + boundary + '"',
    'MIME-Version: 1.0',
    `To: ${email}`,
    `Subject: ${subject}`,
    '',
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    '',
    body,
    '',
  ];

  // Loop tiap QR dan tambahkan sebagai attachment
  qrBase64Array.forEach((qrBase64, index) => {
    const base64Data = qrBase64.replace(/^data:image\/png;base64,/, '');
    messageParts.push(
      `--${boundary}`,
      'Content-Type: image/png',
      'Content-Transfer-Encoding: base64',
      `Content-Disposition: attachment; filename="tiket_qr_${index + 1}.png"`,
      '',
      base64Data,
      ''
    );
  });

  // Akhiri boundary
  messageParts.push(`--${boundary}--`);

  // Gabungkan dan encode ke base64 URL safe
  const rawMessage = Buffer.from(messageParts.join('\r\n'))
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  // Kirim email via Gmail API
  await gmail.users.messages.send({
    userId: 'me',
    requestBody: { raw: rawMessage }
  });

  console.log(`✅ Email dengan QR terkirim ke ${email}`);
};
