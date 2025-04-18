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
