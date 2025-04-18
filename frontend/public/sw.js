self.addEventListener('push', function(event) {
    const data = event.data?.json() || {};
    self.registration.showNotification(data.title || "Pemberitahuan", {
      body: data.body || "Tiketmu segera habis!",
      icon: '/tickeroo-icon.png'
    });
  });
  