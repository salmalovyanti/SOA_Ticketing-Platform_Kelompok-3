const db = require('../../config/database'); 
const { User } = require('../../models'); 

exports.create = async (data) => {
  return await User.create(data);
};

exports.getAll = async () => {
  return await User.findAll();
};

exports.getById = async (id) => {
  return await User.findByPk(id);
};

exports.update = async (id, data) => {
  const user = await User.findByPk(id);
  if (!user) return null;
  await user.update(data);
  return user;
};

exports.delete = async (id) => {
  const user = await User.findByPk(id);
  if (!user) return null;
  await user.destroy();
  return user;
};

exports.updateProfile = async (id, data) => {
    const user = await User.findByPk(id);
    if (!user) return null;
  
    // Hanya update field tertentu untuk profile
    const fieldsToUpdate = {};
    if (data.name !== undefined) fieldsToUpdate.name = data.name;
    if (data.email !== undefined) fieldsToUpdate.email = data.email;
    if (data.phone !== undefined) fieldsToUpdate.phone = data.phone;
  
    await user.update(fieldsToUpdate);
    return user;
  };
  