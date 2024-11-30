const CACHE_NAME = 'huicrochet-cache-v1';
const urlsToCache = [
  '/',
  '/login',
  '/logo.png',
];

self.addEventListener('install', (event: any) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Archivos cacheados');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event: any) => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

