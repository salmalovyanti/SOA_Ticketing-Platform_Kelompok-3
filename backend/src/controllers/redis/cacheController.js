// controllers/redis/cacheController.js
const redisClient = require('../../config/redisClient');

exports.getPopularEvents = async (req, res) => {
  try {
    const data = await redisClient.get('dashboard_events');
    if (data) return res.json(JSON.parse(data));
    // Fetch from DB (mock)
    const events = [{ id: 1, name: 'Concert' }, { id: 2, name: 'Football' }];
    await redisClient.setEx('dashboard_events', 3600, JSON.stringify(events));
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to cache dashboard events' });
  }
};

exports.preloadEvent = async (req, res) => {
  try {
    const data = await redisClient.get('popular_events');
    if (data) return res.json(JSON.parse(data));
    const events = [{ id: 1, name: 'Theater' }, { id: 3, name: 'Jazz Festival' }];
    await redisClient.setEx('popular_events', 3600, JSON.stringify(events));
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to preload popular events' });
  }
};