const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerSpec = require('./swagger/swagger');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

// Redis client kalau digunakan
const redisClient = require('./config/redisClient');

// Google Auth
const { oauth2Client } = require('./config/googleAuth');  // pastikan oauth2Client sesuai
const { google } = require('googleapis');

// Import routes
const orderRoutes = require('./routes/order.routes');
const cartRoutes = require('./routes/cart.routes');
const orderDetailRoutes = require('./routes/order_detail.routes');
const promoCodeRoutes = require('./routes/promo_code.routes');

const app = express();
const PORT = process.env.PORT || 3003; // Sesuaikan port untuk order-service

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Routing
app.use('/api/order', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order-detail', orderDetailRoutes);
app.use('/api/promo-code', promoCodeRoutes);

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Route untuk menerima callback dari Google OAuth2
app.get('/oauth2callback', async (req, res) => {
  const code = req.query.code;  // Ambil authorization code dari URL
  try {
    // Tukar authorization code dengan access token
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);  // Set credentials di oauth2Client

    // Token berhasil diterima, kamu bisa menyimpan token di tempat yang aman
    console.log('Tokens:', tokens);

    // Redirect ke halaman atau berikan pesan sukses
    res.redirect('/success');  // Bisa diganti sesuai kebutuhan

  } catch (error) {
    console.error('Error getting OAuth tokens:', error);
    res.status(500).send('Error getting OAuth tokens');
  }
});

app.get('/success', (req, res) => {
  res.send('OAuth2 authentication successful! You can now send emails.');
});

// Health check
app.get('/', (req, res) => {
  res.send('☑️ Order Service is running');
});

// Start Server
app.listen(PORT, () => {
  console.log(`☑️ Order Service running at http://localhost:${PORT}`);
  console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
});