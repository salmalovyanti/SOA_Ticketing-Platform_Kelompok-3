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
  