const redis = require('redis');
const { Server } = require('socket.io');

const io = new Server({
  cors: { origin: "*" }
});

const redisClient = redis.createClient();
redisClient.connect();

io.on("connection", (socket) => {
  console.log("Admin dashboard terhubung:", socket.id);
});

(async function listenQueue() {
  while (true) {
    try {
      const result = await redisClient.blPop('notif_admin_queue', 0);
      const message = JSON.parse(result.element);
      console.log("Redis notif:", message);

      io.emit("notif_alert", message);
    } catch (err) {
      console.error("❌ Error redis:", err);
    }
  }
})();

module.exports = io;