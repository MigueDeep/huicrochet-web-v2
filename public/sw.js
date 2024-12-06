const CACHE_NAME = 'huicrochet-cache-v3';
const urlsToCache = [
  '/',
  '/customer',
  '/login',
  '/products',
  '/colors',
  '/dashboard',
  '/users',
  '/categories',
  '/orders',
  '/products/create',
  '/products/base',
  '/logo.png',
  '../css/app.css',
  '../src/config/Pouchdb.ts',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Archivos cacheados');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

