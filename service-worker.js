// Версия service worker (менять при каждом коммите!)
const SW_VERSION = '2025-08-07_1:25';

self.addEventListener('install', (event) => {
  self.skipWaiting(); // Активируем сразу
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    // Удаляем ВСЕ кэши
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => caches.delete(key)))
    )
  );
  self.clients.claim(); // Захватываем все вкладки
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request, { cache: 'no-store' }) // ❗ network only
  );
});
