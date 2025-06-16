const { PromoCode, Order } = require('../models');

exports.create = async (data) => {
  return await PromoCode.create(data);
};

// Menukarkan kode promo untuk mendapatkan diskon
exports.redeemPromo = async (promoDetails) => {
  try {
    // Mencari promo berdasarkan kode yang dimasukkan
    const promo = await PromoCode.findOne({ where: { code: promoDetails.promo_code, deleted_at: null } });

    if (!promo) {
      throw new Error('Kode promo tidak valid atau sudah kadaluarsa');
    }

    // Memeriksa apakah promo masih berlaku
    const currentDate = new Date();
    if (currentDate < promo.start_date || currentDate > promo.end_date) {
      throw new Error('Kode promo tidak berlaku pada waktu ini');
    }

    // Memverifikasi apakah pesanan sudah sesuai dan promo masih bisa digunakan
    const order = await Order.findOne({ where: { order_id: promoDetails.order_id, user_id: promoDetails.user_id } });
    if (!order) {
      throw new Error('Pesanan tidak ditemukan atau bukan milik pengguna');
    }

    // Menghitung potongan berdasarkan promo
    const discountAmount = Math.min(promo.max_discount, (order.total_amount * promo.discount_percentage) / 100);

    // Memperbarui pesanan dengan promo
    order.discount_amount = discountAmount;
    order.final_amount = order.total_amount - discountAmount;
    await order.save();

    return order;
  } catch (err) {
    throw err;
  }
};