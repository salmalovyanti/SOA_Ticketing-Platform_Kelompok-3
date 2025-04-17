// controllers/redis/tokenController.js
const redisClient = require('../../config/redisClient');

exports.storeToken = async (email, token) => {
  await redisClient.setEx(email, 3600, token); // 1 jam
};