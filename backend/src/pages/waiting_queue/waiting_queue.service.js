const { WaitingQueue, Event, User } = require('../../models');

exports.create = async (data) => {
  return await WaitingQueue.create(data);
};

exports.getAll = async () => {
  return await WaitingQueue.findAll({
    include: [
      {
        model: Event,
        as: 'event',
        attributes: ['event_name', 'event_date']
      },
      {
        model: User,
        as: 'user',
        attributes: ['username', 'email']
      }
    ]
  });
};

exports.getById = async (id) => {
  return await WaitingQueue.findByPk(id, {
    include: [
      {
        model: Event,
        as: 'event',
        attributes: ['event_name', 'event_date']
      },
      {
        model: User,
        as: 'user',
        attributes: ['username', 'email']
      }
    ]
  });
};

exports.update = async (id, data) => {
  const queue = await WaitingQueue.findByPk(id);
  if (!queue) throw new Error('Queue not found');
  await queue.update(data);
  return queue;
};

exports.delete = async (id) => {
  const queue = await WaitingQueue.findByPk(id);
  if (!queue) throw new Error('Queue not found');
  await queue.destroy();
};
