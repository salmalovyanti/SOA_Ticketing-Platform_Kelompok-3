// routes/redisRoutes.js
const express = require('express');
const router = express.Router();

// Import controller functions
const {
  getPopularEvents,
  preloadEvent
} = require('../controllers/redis/cacheController');

const {
  storeToken
} = require('../controllers/redis/tokenController');

const {
  countView,
  getLeaderboard
} = require('../controllers/redis/hitCounterController');

const {
  saveQuery,
  getSearchHistory
} = require('../controllers/redis/searchHistoryController');

const {
  enqueueUser
} = require('../controllers/redis/queueController');

const {
  updateStock
} = require('../controllers/redis/stockController');

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
