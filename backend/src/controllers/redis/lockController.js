// controllers/redis/lockController.js
const redisClient = require('../../config/redisClient');

exports.lockSeat = async (req, res) => {
  const { seatId, userId } = req.body;
  const key = `booking_lock:${seatId}`;
  const set = await redisClient.set(key, userId, { NX: true, PX: 120000 }); // 2 menit lock
  if (set) {
    res.json({ locked: true });
  } else {
    res.status(423).json({ locked: false, message: 'Seat already locked' });
  }
};

exports.preventDoubleBooking = async (req, res) => {
  const { seatId } = req.body;
  const key = `booking_lock:${seatId}`;
  await redisClient.del(key);
  res.json({ released: true });
};
