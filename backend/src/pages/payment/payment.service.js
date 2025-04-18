const { Payment, Order } = require('../../models');

exports.cancelTicket = async (user_id, payment_id) => {
  try {
    // Find payment by ID and user_id
    const payment = await Payment.findOne({
      where: { payment_id, user_id },
      include: [{ model: Order, as: 'order' }]
    });

    if (!payment) {
      return { success: false, error: 'Payment not found or unauthorized' };
    }

    // Cancel the order and payment
    const order = payment.order;
    order.order_status = 'cancelled';  // Change order status
    payment.status = 'failed';  // Mark payment as failed
    await order.save();
    await payment.save();

    return { success: true, data: { order, payment } };
  } catch (err) {
    console.error('❌ Error saat cancelTicket service:', err);
    return { success: false, error: err.message };
  }
};
