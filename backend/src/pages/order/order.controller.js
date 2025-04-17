const service = require('./order.service');

// Create Order
exports.createOrder = async (req, res) => {
  try {
    const newOrder = await service.create(req.body);
    res.status(201).json(newOrder);
  } catch (err) {
    console.error('❌ Error saat createOrder:', err);
    res.status(400).json({ error: err.message });
  }
};

// Get All Orders (with Event data)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await service.getAll();
    res.json(orders);
  } catch (err) {
    console.error('❌ Error saat getAllOrders:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get Order by ID
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

// Update Order
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

// Delete Order
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
