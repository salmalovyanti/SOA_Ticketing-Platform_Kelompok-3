const { Payment, Order } = require('../shared_models');

// Membatalkan tiket berdasarkan user_id dan payment_id
exports.cancelTicket = async (user_id, payment_id) => {
  try {
    // Mencari data pembayaran berdasarkan payment_id dan user_id
    const payment = await Payment.findOne({
      where: { payment_id, user_id },
      include: [{ model: Order, as: 'order' }]
    });

    // Jika pembayaran tidak ditemukan atau bukan milik user
    if (!payment) {
      return { success: false, error: 'Pembayaran tidak ditemukan atau tidak memiliki akses' };
    }

    // Membatalkan pesanan dan memperbarui status pembayaran
    const order = payment.order;
    order.order_status = 'cancelled';  // Ubah status pesanan menjadi dibatalkan
    payment.status = 'failed';         // Tandai status pembayaran sebagai gagal
    await order.save();
    await payment.save();

    // Mengembalikan respons sukses
    return { success: true, data: { order, payment } };
  } catch (err) {
    console.error('❌ Terjadi kesalahan pada service cancelTicket:', err);
    return { success: false, error: err.message };
  }
};
