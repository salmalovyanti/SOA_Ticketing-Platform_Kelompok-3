const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User'); // Ganti dengan model User kamu, jika ada

// Passport Local Authentication Strategy
passport.use(new LocalStrategy(
  function(username, password, done) {
    // Ganti dengan logika pengecekan user di database
    User.findOne({ username: username }, function(err, user) {
      if (err) return done(err);
      if (!user) return done(null, false, { message: 'User not found' });
      
      // Jika password cocok (ganti dengan validasi password yang sesuai)
      if (user.password !== password) {
        return done(null, false, { message: 'Invalid credentials' });
      }
      
      return done(null, user);
    });
  }
));

// Serialize & Deserialize User (session)
passport.serializeUser((user, done) => {
  done(null, user.id); // Menyimpan id user di session
});

passport.deserializeUser((id, done) => {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = passport;
