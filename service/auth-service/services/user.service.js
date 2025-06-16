const db = require('../config/database');
const User = require('../models/user.model');

// Membuat user baru
exports.create = async (data) => {
  return await User.create(data);
};

// Mengambil semua user
exports.getAll = async () => {
  return await User.findAll();
};

// Mengambil user berdasarkan ID
exports.getById = async (id) => {
  return await User.findByPk(id);
};

// Memperbarui data user berdasarkan ID
exports.update = async (id, data) => {
  const user = await User.findByPk(id);
  if (!user) return null; // Jika user tidak ditemukan
  await user.update(data); // Update data user
  return user;
};

// Menghapus user berdasarkan ID
exports.delete = async (id) => {
  const user = await User.findByPk(id);
  if (!user) return null; // Jika user tidak ditemukan
  await user.destroy(); // Menghapus user dari database
  return user;
};

// Memperbarui profil user
exports.updateProfile = async (id, data) => {
  const user = await User.findByPk(id);
  if (!user) return null; // Jika user tidak ditemukan

  // Hanya update field tertentu untuk profil
  const fieldsToUpdate = {};
  if (data.name !== undefined) fieldsToUpdate.name = data.name; // Update nama jika ada
  if (data.email !== undefined) fieldsToUpdate.email = data.email; // Update email jika ada
  if (data.phone !== undefined) fieldsToUpdate.phone = data.phone; // Update nomor telepon jika ada

  await user.update(fieldsToUpdate); // Update profil user
  return user;
};

// Memperbarui avatar user
exports.updateAvatar = async (id, avatarUrl) => {
  const user = await User.findByPk(id);
  if (!user) return null; // Jika user tidak ditemukan

  await user.update({ avatar_url: avatarUrl }); // Update URL avatar user
  return user;
};