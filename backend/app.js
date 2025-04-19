const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const passport = require('./src/config/passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('./src/config/config');
require('dotenv').config();
// redis
const session = require('express-session');
const redis = require("redis");
const redisStore = require('connect-redis').default;
const redisClient = redis.createClient({
  socket: {
    host: '127.0.0.1',
    port: 6379
  },
});
redisClient.connect().catch(console.error);
const { oauth2Client } = require('./src/config/googleAuth');  // pastikan oauth2Client sesuai
const { google } = require('googleapis');

// Import Routes
const cartRoutes = require('./src/pages/cart/cart.routes');
const categoryRoutes = require('./src/pages/category/category.routes');
const eventRoutes = require('./src/pages/event/event.routes');
const locationRoutes = require('./src/pages/location/location.routes');
const orderRoutes = require('./src/pages/order/order.routes');
const orderDetailRoutes = require('./src/pages/order_detail/order_detail.routes');
const paymentRoutes = require('./src/pages/payment/payment.routes');
const promoCodeRoutes = require('./src/pages/promo_code/promo_code.routes');
const ticketRoutes = require('./src/pages/ticket/ticket.routes');
const userRoutes = require('./src/pages/user/user.routes');
const venueRoutes = require('./src/pages/venue/venue.routes');
const waitingQueueRoutes = require('./src/pages/waiting_queue/waiting_queue.routes');
const wishlistRoutes = require('./src/pages/wishlist/wishlist.routes');
const authRoutes = require('./src/routes/authRoutes');
const redisRoutes = require('./src/routes/redisRoutes'); // API Redis
const googleRoutes = require('./src/routes/googleRoutes');


const app = express();
const port = process.env.PORT || 3000;

// Konfigurasi CORS — biarkan akses dari frontend di port 5500
const corsOptions = {
  origin: 'http://127.0.0.1:5500', // Sesuaikan dengan frontend Anda
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Tambahkan metode lain jika diperlukan
  credentials: true,
};
app.use(cors(corsOptions));

// Middleware lainnya
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/google', googleRoutes);


// Session Middleware dengan Redis Store
app.use(
  session({
    store: redisStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
   },
 })
);

// Inisialisasi Passport
app.use(passport.initialize());
app.use(passport.session());

// Routing API
app.use('/api/cart', cartRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/event', eventRoutes);
app.use('/api/location', locationRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/order_detail', orderDetailRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/promo_code', promoCodeRoutes);
app.use('/api/ticket', ticketRoutes);
app.use('/api/user', userRoutes);
app.use('/api/venue', venueRoutes);
app.use('/api/waiting_queue', waitingQueueRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/auth', authRoutes); // Pastikan route login/register masuk ke sini
app.use(redisRoutes); // Route Redis untuk caching, hit counter, dll.

// Passport Google OAuth Setup
passport.use(new GoogleStrategy({
  clientID: config.googleClientID,
  clientSecret: config.googleClientSecret,
  callbackURL: config.googleCallbackURL
}, (accessToken, refreshToken, profile, done) => {
  // Ambil data dari Google
  const googleId = profile.id;
  const username = profile.displayName;
  const email = profile.emails && profile.emails[0]?.value;

  // Asumsi Anda memiliki model User yang sudah didefinisikan dan diimpor
  const User = require('./src/models/user');

  // Cari user di database
  User.findByGoogleId(googleId, (err, existingUser) => {
    if (err) return done(err);

    if (existingUser) {
      // User sudah ada, lanjutkan
      return done(null, existingUser);
    } else {
      // User belum ada, simpan ke database
      User.createUserFromGoogle({ googleId: googleId, displayName: username, emails: [{ value: email }] }, (err, newUser) => {
        if (err) return done(err);
        return done(null, newUser);
      });
    }
  });
}));

passport.serializeUser((user, done) => {
  done(null, user.id); // simpan ID user di session
});

passport.deserializeUser((id, done) => {
  // Asumsi Anda memiliki model User yang sudah didefinisikan dan diimpor
  const User = require('./models/user'); // Contoh impor model User
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

/* ----------- Google OAuth Routes ----------- */
// Mulai proses login dengan Google
app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Callback dari Google setelah login
app.get('/auth/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/failed',
    successRedirect: 'http://127.0.0.1:5500/public/dashboard.html', // Redirect jika berhasil
  }),
  // Anda tidak perlu handler di sini jika menggunakan successRedirect
);

// Jika login gagal
app.get('/auth/failed', (req, res) => {
  res.send('<h2>Login gagal. Silakan coba lagi.</h2>');
});

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

/* ------------- Static File Serving ------------ */
app.use(express.static(path.join(__dirname, 'public')));

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
