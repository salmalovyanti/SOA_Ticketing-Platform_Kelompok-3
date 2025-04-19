const service = require('./order.service');
const { refundOrderSchema } = require('./order.validations');

// Handler untuk membuat order
exports.createOrder = async (req, res) => {
  try {
    const newOrder = await service.create(req.body);
    res.status(201).json(newOrder);
  } catch (err) {
    console.error('❌ Error saat createOrder:', err);
    res.status(400).json({ error: err.message });
  }
};

// Handler untuk menampilkan seluruh data order
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await service.getAll();
    res.json(orders);
  } catch (err) {
    console.error('❌ Error saat getAllOrders:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Handler untuk menampilkan satu data order
exports.getOrderById = async (req, res) => {
  try {
    const order = await service.getById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    console.error('❌ Error saat getOrderById:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Handler untuk mengedit data order
exports.updateOrder = async (req, res) => {
  try {
    const updatedOrder = await service.update(req.params.id, req.body);
    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(updatedOrder);
  } catch (err) {
    console.error('❌ Error saat updateOrder:', err);
    res.status(400).json({ error: err.message });
  }
};

// Handler untuk menghapus data order
exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await service.delete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(204).send(); // No content
  } catch (err) {
    console.error('❌ Error saat deleteOrder:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Handler untuk menampilkan seluruh tiket yang dibeli user
exports.getMyTickets = async (req, res) => {
  try {
    const userId = req.user.id;
    const tickets = await service.getTicketsByUser(userId);
    res.json(tickets);
  } catch (err) {
    console.error('❌ Error saat getMyTickets:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Handler untuk mengajukan refund tiket
exports.requestRefund = async (req, res) => {
  try {
    const { error, value } = refundOrderSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const result = await service.requestRefund(value);
    res.status(200).json({
      message: 'Refund request successful',
      data: result
    });
  } catch (err) {
    console.error('❌ Error saat requestRefund:', err);
    res.status(400).json({ error: err.message });
  }
};