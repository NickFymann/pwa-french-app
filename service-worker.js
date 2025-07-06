const CACHE_NAME = 'french-app-cache-v1';
const BASE_PATH = '/pwa-french-app';

const urlsToCache = [
  `${BASE_PATH}/`,
  `${BASE_PATH}/index.html`,
  `${BASE_PATH}/style.css`,
  `${BASE_PATH}/manifest.json`,
  `${BASE_PATH}/service-worker.js`,
  `${BASE_PATH}/rules/index.html`,
  `${BASE_PATH}/rules/basic_rules.html`,
  // Можно добавить и другие файлы
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(
      (response) => response || fetch(event.request)
    )
  );
});
