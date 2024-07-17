const CACHE_NAME = 'site-cache-v1';
const OFFLINE_URL = 'error.html';
const urlsToCache = [
  '/',
  '/styles/styles.css',
  '/js/index.js',
  '/js/notifications.js',
  '/js/opens.js',
  '/js/scanner.js',
  '/index.html',
  '/perevod.html',
  '/large-image.jpg',
  '/images',
  '/sw.js',
  '/cacheList.json',
  '/generateCacheList.js',
  '/htaccess',
  '/error.html',
  'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js',
  'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js',
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
  'https://rawgit.com/schmich/instascan-builds/master/instascan.min.js',
  'https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap',
  'https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap',
  OFFLINE_URL
  // Добавьте сюда другие файлы, которые вы хотите кэшировать
];

fetch('cacheList.json')
  .then(response => response.json())
  .then(images => {
    urlsToCache.push(...images);
  });

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
    fetch(event.request).catch(() => {
      return caches.match(event.request).then(response => {
        return response || caches.match(OFFLINE_URL);
      });
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
