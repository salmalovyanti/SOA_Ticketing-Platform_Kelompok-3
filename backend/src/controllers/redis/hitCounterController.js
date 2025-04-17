// controllers/redis/hitCounterController.js
const redisClient = require('../../config/redisClient');

exports.countView = async (req, res) => {
  const eventId = req.params.id;
  const key = `event_views:${eventId}`;
  const views = await redisClient.incr(key);
  res.json({ eventId, views });
};

exports.getLeaderboard = async (req, res) => {
  const leaderboard = await redisClient.zRangeWithScores('event_leaderboard', 0, -1, { REV: true });
  res.json(leaderboard);
};