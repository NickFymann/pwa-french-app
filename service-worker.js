self.addEventListener('install', (event) => {
  // Пропустить ожидание — активироваться сразу
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Удалить все существующие кэши
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Всегда тянуть с сети
  event.respondWith(fetch(event.request));
});
