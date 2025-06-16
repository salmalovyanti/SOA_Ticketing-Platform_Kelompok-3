const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'ticketing-app',
  brokers: ['localhost:9092'] 
});

const producer = kafka.producer();

async function connectKafka() {
  await producer.connect();
  console.log('Kafka Producer connected');
}

connectKafka();

module.exports = { kafkaProducer: producer };
