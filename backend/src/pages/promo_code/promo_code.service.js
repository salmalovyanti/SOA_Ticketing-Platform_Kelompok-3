const { PromoCode, Order } = require('../../models');

exports.create = async (data) => {
  return await PromoCode.create(data);
};

// Redeem Promo
exports.redeemPromo = async (promoDetails) => {
  try {
    // Cari promo code berdasarkan kode yang dimasukkan
    const promo = await PromoCode.findOne({ where: { code: promoDetails.promo_code, deleted_at: null } });

    if (!promo) {
      throw new Error('Promo code is invalid or expired');
    }

    // Cek apakah promo masih berlaku
    const currentDate = new Date();
    if (currentDate < promo.start_date || currentDate > promo.end_date) {
      throw new Error('Promo code is not valid at this time');
    }

    // Verifikasi apakah order sudah sesuai dan promo masih bisa digunakan
    const order = await Order.findOne({ where: { order_id: promoDetails.order_id, user_id: promoDetails.user_id } });
    if (!order) {
      throw new Error('Order not found or doesn’t belong to the user');
    }

    // Hitung potongan berdasarkan promo
    const discountAmount = Math.min(promo.max_discount, (order.total_amount * promo.discount_percentage) / 100);

    // Update order dengan promo
    order.discount_amount = discountAmount;
    order.final_amount = order.total_amount - discountAmount;
    await order.save();

    return order;
  } catch (err) {
    throw err;
  }
};