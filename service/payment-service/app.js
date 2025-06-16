require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectToDatabase } = require('./config/db'); // Optional kalau mau testing koneksi

const app = express();
const PORT = process.env.PORT || 3005;

// Import Routes
const paymentRoutes = require('./routes/payment.routes');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Routing
app.use('/api/payment', paymentRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('🎫 Ticket Service is running');
});

// Start Server
app.listen(PORT, () => {
  console.log(`🎫 Ticket Service running at http://localhost:${PORT}`);
});