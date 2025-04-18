const Category = require('./category.model');

exports.getAll = async () => {
  return await Category.findAll();
};

exports.create = async (data) => {
  return await Category.create(data);
};

exports.getById = async (id) => {
  return await Category.findByPk(id);
};

exports.update = async (id, data) => {
  const [updated] = await Category.update(data, {
    where: { category_id: id }
  });
  return updated;
};

exports.remove = async (id) => {
  const deleted = await Category.destroy({
    where: { category_id: id }
  });
  return deleted;
};
