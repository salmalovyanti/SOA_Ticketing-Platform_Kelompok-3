if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => {
        console.log('Service Worker registered', reg);
        return Notification.requestPermission();
      })
      .then(permission => {
        if (permission === 'granted') {
          console.log("Notifikasi diizinkan");
        }
      });
  }
  