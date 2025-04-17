// controllers/redis/searchHistoryController.js
const redisClient = require('../../config/redisClient');

exports.saveQuery = async (req, res) => {
  const { email, query } = req.body;
  const key = `search_history:${email}`;
  await redisClient.lPush(key, query);
  await redisClient.lTrim(key, 0, 9); // simpan max 10 riwayat
  res.json({ status: 'ok' });
};

exports.getSearchHistory = async (req, res) => {
  const { email } = req.params;
  const key = `search_history:${email}`;
  const history = await redisClient.lRange(key, 0, -1);
  res.json(history);
};