// controllers/redis/queueController.js
const redisClient = require('../../config/redisClient');

exports.enqueueUser = async (req, res) => {
  const { eventId, userId } = req.body;
  const key = `queue:${eventId}`;
  await redisClient.rPush(key, userId);
  res.json({ message: 'User added to queue' });
};