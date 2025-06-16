const service = require('../services/location.service');

// Handler untuk menampilkan seluruh data lokasi
exports.getAllLocations = async (req, res) => {
  try {
    const locations = await service.getAll();
    res.json(locations);
  } catch (err) {
    console.error('❌ Error saat getAllLocations:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Handler untuk menambahkan lokasi
exports.createLocation = async (req, res) => {
  try {
    const newLocation = await service.create(req.body);
    res.status(201).json(newLocation);
  } catch (err) {
    console.error('❌ Error saat createLocation:', err);
    res.status(400).json({ error: err.message });
  }
};

// Handler untuk menampilkan satu lokasi
exports.getLocationById = async (req, res) => {
  try {
    const location = await service.getById(req.params.id);
    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }
    res.json(location);
  } catch (err) {
    console.error('❌ Error saat getLocationById:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Handler untuk mengedit lokasi
exports.updateLocation = async (req, res) => {
  try {
    const updated = await service.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Location not found' });
    }
    res.json({ message: 'Location updated successfully' });
  } catch (err) {
    console.error('❌ Error saat updateLocation:', err);
    res.status(400).json({ error: err.message });
  }
};

// Handler untuk menghapus lokasi
exports.deleteLocation = async (req, res) => {
  try {
    const deleted = await service.remove(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Location not found' });
    }
    res.json({ message: 'Location deleted successfully' });
  } catch (err) {
    console.error('❌ Error saat deleteLocation:', err);
    res.status(500).json({ error: 'Server error' });
  }
};