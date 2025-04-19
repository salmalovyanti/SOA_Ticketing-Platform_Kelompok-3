const service = require('./waiting_queue.service');

// Handler untuk menambahkan data antrian
exports.createQueue = async (req, res) => {
  try {
    const newQueue = await service.create(req.body);
    res.status(201).json(newQueue);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Handler untuk menampilkan seluruh data antrian
exports.getAllQueues = async (req, res) => {
  try {
    const queues = await service.getAll();
    res.json(queues);
  } catch (err) {
    console.error('❌ Error saat getAllQueues:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Handler untuk menampilkan satu data antrian
exports.getQueueById = async (req, res) => {
  try {
    const queue = await service.getById(req.params.id);
    if (!queue) return res.status(404).json({ error: 'Queue not found' });
    res.json(queue);
  } catch (err) {
    console.error('❌ Error saat getQueueById:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Handler untuk mengedit data antrian
exports.updateQueue = async (req, res) => {
  try {
    const updated = await service.update(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Handler untuk menghapus data antrian
exports.deleteQueue = async (req, res) => {
  try {
    await service.delete(req.params.id);
    res.json({ message: 'Queue deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
