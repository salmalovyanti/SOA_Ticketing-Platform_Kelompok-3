const paymentService = require('../services/payment.service');

// Handler untuk membatalkan pembelian tiket
exports.cancelTicket = async (req, res) => {
  try {
    const { user_id, payment_id } = req.body;

    // Validasi input
    const result = await paymentService.cancelTicket(user_id, payment_id);

    if (result.success) {
      res.status(200).json({ message: 'Ticket cancelled successfully', data: result.data });
    } else {
      res.status(400).json({ error: 'Failed to cancel ticket', details: result.error });
    }
  } catch (err) {
    console.error('❌ Error saat cancelTicket:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
