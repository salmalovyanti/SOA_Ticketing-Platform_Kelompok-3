const service = require('./event.service');

// Handler untuk mendapatkan semua event
exports.getAllEvents = async (req, res) => {
  try {
    const events = await service.getAll();
    res.json(events);
  } catch (err) {
    console.error('❌ Error saat getAllEvents:', err); // Tambahin ini
    res.status(500).json({ error: 'Server error' });
  }
};

// Handler untuk membuat event baru
exports.createEvent = async (req, res) => {
  try {
    const newEvent = await service.create(req.body);
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Handler untuk mendapatkan detail event berdasarkan ID
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

// Handler untuk mendapatkan semua event berdasarkan kategori
exports.getByCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const events = await service.getByCategory(categoryId);
    res.json(events);
  } catch (error) {
    console.error('Error fetching events by category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Handler untuk mendapatkan semua event berdasarkan lokasi
exports.getByLocation = async (req, res) => {
  try {
    const locationId = req.params.id;
    const events = await service.getByLocation(locationId);
    res.json(events);
  } catch (error) {
    console.error('Error fetching events by location:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Handler untuk mencari event berdasarkan nama (search)
exports.searchEvents = async (req, res) => {
  try {
    const keyword = req.query.name;
    const events = await service.searchEvents(keyword);
  
    if (!events || events.length === 0) {
      return res.status(404).json({ message: 'No events found' });
    }
    res.status(200).json(events);
  } catch (error) {
    console.error('Error during event search:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Handler untuk mengupdate event berdasarkan ID
exports.updateEvent = async (req, res) => {
  try {
    const updatedEvent = await service.update(req.params.id, req.body);
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ message: 'Event updated successfully', data: updatedEvent });
  } catch (error) {
    console.error('❌ Error saat updateEvent:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Handler untuk menghapus event berdasarkan ID
exports.deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const deleted = await service.delete(eventId);   
    if (!deleted) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('❌ Error saat deleteEvent:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
