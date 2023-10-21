export default () => {
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    for (const registration of registrations) {
      registration.unregister();
    }
  });
  // キャッシュストレージの削除
  caches.keys().then(function (keys) {
    const promises = [];
    keys.forEach(function (cacheName) {
      if (cacheName) {
        promises.push(caches.delete(cacheName));
      }
    });
  });
};
