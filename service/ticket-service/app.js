require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectToDatabase } = require('./config/db'); // Optional kalau mau testing koneksi

const app = express();
const PORT = process.env.PORT || 3003;

// Import Routes
const ticketRoutes = require('./routes/ticket.routes');
const eventRoutes = require('./routes/event.routes');
const categoryRoutes = require('./routes/category.routes');
const locationRoutes = require('./routes/location.routes');
const venueRoutes = require('./routes/venue.routes');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Routing
app.use('/api/ticket', ticketRoutes);
app.use('/api/event', eventRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/location', locationRoutes);
app.use('/api/venue', venueRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('🎫 Ticket Service is running');
});

// Start Server
app.listen(PORT, () => {
  console.log(`🎫 Ticket Service running at http://localhost:${PORT}`);
});