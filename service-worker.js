const CACHE_NAME = 'french-app-cache-v2';

const urlsToCache = [
  '/pwa-french-app/',
  '/pwa-french-app/index.html',
  '/pwa-french-app/style.css',
  '/pwa-french-app/manifest.json',
  '/pwa-french-app/rules/index.html',
  '/pwa-french-app/rules/basic_rules.html',
  '/pwa-french-app/icon-192.png',
  '/pwa-french-app/icon-512.png',
  // Добавь другие html/css/audio файлы при необходимости
];

// Установка service worker и кэширование файлов
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Активация и удаление старого кеша
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// Обработка запросов: сначала из кеша, иначе — из сети
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).catch(() => {
          // Можно сюда добавить оффлайн-страницу при необходимости
        })
      );
    })
  );
});

