const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const sequelize = require('./config/database'); 

// Import routes
const userRoutes = require('./routes/user.routes');
const notificationPrefRoutes = require('./routes/notification_preference.routes');
const authRoutes = require('./routes/authRoutes');
const wishlistRoutes = require('./routes/wishlist.routes');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Use routes
app.use('/api/user', userRoutes);
app.use('/api/user', notificationPrefRoutes); // tergantung URL yang kamu tentukan
app.use('/api/auth', authRoutes);
app.use('/api/wishlist', wishlistRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', service: 'auth-service' });
});

// Start server
const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
  console.log(`✅ auth-service running on port ${PORT}`);
  try {
    await sequelize.authenticate(); // jika pakai Sequelize
    console.log('✅ Database connected');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
});
