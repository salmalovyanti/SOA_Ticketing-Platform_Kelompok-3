require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerSpec = require('./swagger/swagger');
const swaggerUi = require('swagger-ui-express');

const app = express();
const PORT = process.env.PORT || 3004;

// Import Routes
const paymentRoutes = require('./routes/payment.routes');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Routing
app.use('/api/payment', paymentRoutes);

 // Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check
app.get('/', (req, res) => {
  res.send('☑️ Payment Service is running');
});

// Start Server
app.listen(PORT, () => {
  console.log(`☑️ Payment Service running at http://localhost:${PORT}`);
  console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
});