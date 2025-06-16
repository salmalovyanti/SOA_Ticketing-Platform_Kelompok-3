const service = require('../services/user.service');
const { createUserSchema, updateUserSchema, updateUserProfileSchema } = require('../validations/user.validations');

// Handler untuk menambahkan user
exports.createUser = async (req, res) => {
  try {
    const { error, value } = createUserSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const user = await service.create(value);
    res.status(201).json(user);
  } catch (err) {
    console.error('❌ Error saat createUser:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Handler untuk menampilkan seluruh data user
exports.getAllUsers = async (req, res) => {
  try {
    const users = await service.getAll();
    res.json(users);
  } catch (err) {
    console.error('❌ Error saat getAllUsers:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Handler untuk menampilkan satu data user
exports.getUserById = async (req, res) => {
  try {
    const user = await service.getById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('❌ Error saat getUserById:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Handler untuk mengedit data user
exports.updateUser = async (req, res) => {
  try {
    const { error, value } = updateUserSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const updatedUser = await service.update(req.params.id, value);
    if (!updatedUser) return res.status(404).json({ error: 'User not found' });

    res.json(updatedUser);
  } catch (err) {
    console.error('❌ Error saat updateUser:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Handler untuk menghapus data user
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await service.delete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: 'User not found' });

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('❌ Error saat deleteUser:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Handler untuk mengedit data profil user (hanya untuk data yang dapat dilihat user)
exports.updateUserProfile = async (req, res) => {
  try {
    const { error, value } = updateUserProfileSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const updatedUser = await service.updateProfile(req.params.id, value);
    if (!updatedUser) return res.status(404).json({ error: 'User not found' });

    res.json(updatedUser);
  } catch (err) {
    console.error('❌ Error saat updateUserProfile:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Handler untuk mengupload foto profil user
exports.uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const avatarUrl = `/uploads/avatars/${req.file.filename}`; // path relatif
    const updatedUser = await service.updateAvatar(req.params.id, avatarUrl);

    if (!updatedUser) return res.status(404).json({ error: 'User not found' });

    res.json({ message: 'Avatar uploaded successfully', avatar_url: avatarUrl });
  } catch (err) {
    console.error('❌ Error saat uploadAvatar:', err);
    res.status(500).json({ error: 'Server error' });
  }
};