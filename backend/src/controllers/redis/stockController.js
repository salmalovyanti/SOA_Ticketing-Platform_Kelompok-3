// controllers/redis/stockController.js
const redisClient = require('../../config/redisClient');

exports.updateStock = async (req, res) => {
  const { eventId } = req.body;
  const key = `stock:${eventId}`;

  const lua = `
    local stock = tonumber(redis.call('GET', KEYS[1]))
    if stock and stock > 0 then
      redis.call('DECR', KEYS[1])
      return 1
    else
      return 0
    end
  `;

  const result = await redisClient.eval(lua, { keys: [key], arguments: [] });
  if (result === 1) {
    res.json({ status: 'success' });
  } else {
    res.status(400).json({ error: 'Out of stock' });
  }
};
