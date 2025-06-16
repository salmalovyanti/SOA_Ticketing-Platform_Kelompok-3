const QRCode = require('qrcode');

async function generateQRCode(ticketCode) {
  try {
    const qrImage = await QRCode.toDataURL(ticketCode);  // ini hasilnya STRING
    return qrImage; // <-- string base64
  } catch (error) {
    console.error('QR generation failed:', error);
    throw error;
  }
}

module.exports = { generateQRCode };