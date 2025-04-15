// Load environment variables from .env file
require('dotenv').config();

module.exports = {
  // JWT Configuration
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,

  // Server Port
  port: process.env.PORT || 3000,

  // Google OAuth Configuration
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleCallbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/auth/callback',

  // Session Secret
  sessionSecret: process.env.SESSION_SECRET || 'your-session-secret',

  // Database Configuration (optional, jika nanti digunakan)
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
};
