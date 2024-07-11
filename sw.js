const CACHE_NAME = 'site-cache-v1';
const urlsToCache = [
  '/',
  '/styles/styles.css',
  '/js/index.js',
  '/js/notifications.js',
  '/js/opens.js',
  '/js/scanner.js',
  '/index.html',
  '/large-image.jpg',
  // Добавьте сюда другие файлы, которые вы хотите кэшировать
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Возвращаем кэшированный ресурс
        }
        return fetch(event.request); // Запрашиваем ресурс из сети
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
