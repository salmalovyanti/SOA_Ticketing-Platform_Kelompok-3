const service = require('../services/venue.service');

// Handler untuk menampilkan seluruh data venue
exports.getAllVenues = async (req, res) => {
  try {
    const venues = await service.getAll();
    res.json(venues);
  } catch (err) {
    console.error('❌ Error saat getAllVenues:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Handler untuk menambahkan data venue
exports.createVenue = async (req, res) => {
  try {
    const newVenue = await service.create(req.body);
    res.status(201).json(newVenue);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Handler untuk menampilkan satu data venue
exports.getVenueById = async (req, res) => {
  try {
    const venue = await service.getById(req.params.id);
    if (!venue) {
      return res.status(404).json({ error: 'Venue not found' });
    }
    res.json(venue);
  } catch (err) {
    console.error('❌ Error saat getVenueById:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Handler untuk mengedit data venue
exports.updateVenue = async (req, res) => {
  try {
    const updated = await service.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Venue not found' });
    }
    res.json({ message: 'Venue updated successfully' });
  } catch (err) {
    console.error('❌ Error saat updateVenue:', err);
    res.status(400).json({ error: err.message });
  }
};

// Handler untuk menghapus data venue
exports.deleteVenue = async (req, res) => {
  try {
    const deleted = await service.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Venue not found' });
    }
    res.json({ message: 'Venue deleted successfully' });
  } catch (err) {
    console.error('❌ Error saat deleteVenue:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
