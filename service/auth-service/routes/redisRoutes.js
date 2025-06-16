// Import Express dan buat router
const express = require('express');
const router = express.Router();

// Mengelola cache event populer & preload data event ke Redis
const {
  getPopularEvents,
  preloadEvent
} = require('../controllers/redis/cacheController');

// Menyimpan token sementara ke Redis
const {
  storeToken
} = require('../controllers/redis/tokenController');

// Menghitung jumlah view dan menampilkan leaderboard
const {
  countView,
  getLeaderboard
} = require('../controllers/redis/hitCounterController');


// Menyimpan dan mengambil riwayat pencarian pengguna
const {
  saveQuery,
  getSearchHistory
} = require('../controllers/redis/searchHistoryController');

// Mengantri user saat event populer/war tiket
const {
  enqueueUser
} = require('../controllers/redis/queueController');

// Mengatur dan mengupdate stok tiket
const {
  updateStock
} = require('../controllers/redis/stockController');

// Mengunci seat untuk mencegah double booking
const {
  lockSeat,
  preventDoubleBooking
} = require('../controllers/redis/lockController');

// Routes

// Caching data event (popular/preload)
router.get('/events/popular', getPopularEvents);
router.get('/event/:id/preload', preloadEvent);

// Token management
router.post('/token/store', storeToken);

// Hit counter & leaderboard
router.get('/event/:id/view', countView);
router.get('/leaderboard', getLeaderboard);

// Search history
router.post('/search', saveQuery);
router.post('/search/history', getSearchHistory);

// Queue system
router.post('/queue/:eventId', enqueueUser);

// Stock ticket
router.post('/stock/update', updateStock);

// Booking lock & double booking prevention
router.post('/booking/lock', lockSeat);
router.post('/booking/check-lock', preventDoubleBooking);

module.exports = router;