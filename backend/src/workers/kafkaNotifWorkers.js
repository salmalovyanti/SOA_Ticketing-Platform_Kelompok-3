// notifWorker.js
const { Kafka } = require('kafkajs');
const { Server } = require('socket.io');

// setup socket.io server
const io = new Server(3002, {
  cors: { origin: '*' }
});

// setup kafka consumer
const kafka = new Kafka({
  clientId: 'notif-worker',
  brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'notif-group' });

async function run() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'notif_admin_topic', fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const msg = JSON.parse(message.value.toString());
      io.emit('notif_alert', msg);
      console.log('notif_alert', msg); // kirim ke frontend via socket.io
    }
  });
}

run().catch(console.error);