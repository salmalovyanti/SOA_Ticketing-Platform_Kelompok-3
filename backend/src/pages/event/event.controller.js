const service = require('./event.service');

exports.getAllEvents = async (req, res) => {
  try {
    const events = await service.getAll();
    res.json(events);
  } catch (err) {
    console.error('❌ Error saat getAllEvents:', err); // Tambahin ini
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const newEvent = await service.create(req.body);
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await service.getById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (err) {
    console.error('❌ Error saat getEventById:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
