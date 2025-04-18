const CACHE_NAME = 'ticket-cache-v1';
const urlsToCache = [
  '/',
  '/login',
  '/events',
   '/events/1',
  '/index.html',
  '/static/js/bundle.js',
  '/static/css/main.css',
];

// Install Service Worker dan Cache file
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch cache fallback
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});


// Push Notification
self.addEventListener('push', function (event) {
    const data = event.data?.json() || {};
    self.registration.showNotification(data.title || "Pemberitahuan", {
      body: data.body || "Tiketmu segera habis!",
      icon: '/tickeroo-icon.png'
    });
  });
  
  // Background Sync
  self.addEventListener('sync', function(event) {
    if (event.tag === 'sync-orders') {
      event.waitUntil(syncOfflineOrders());
    }
  });
  
  async function syncOfflineOrders() {
    try {
      const data = await getOfflineData(); // ambil dari IndexedDB/localStorage
      await fetch('/api/orders/sync', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      });
      console.log('[SW] Sinkronisasi berhasil!');
    } catch (err) {
      console.error('[SW] Gagal sync:', err);
    }
  }
  