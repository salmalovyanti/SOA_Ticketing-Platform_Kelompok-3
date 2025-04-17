const service = require('./order_detail.service');

exports.createOrderDetail = async (req, res) => {
  try {
    const result = await service.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllOrderDetails = async (req, res) => {
  try {
    const result = await service.getAll();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOrderDetailById = async (req, res) => {
  try {
    const result = await service.getById(req.params.id);
    if (!result) return res.status(404).json({ error: 'OrderDetail not found' });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateOrderDetail = async (req, res) => {
  try {
    const result = await service.update(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteOrderDetail = async (req, res) => {
  try {
    await service.delete(req.params.id);
    res.json({ message: 'OrderDetail deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
