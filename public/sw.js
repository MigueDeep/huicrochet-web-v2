const CACHE_NAME = 'huicrochet-cache-v5';
const urlsToCache = [
  '/', // Página principal
  '/colors', // Página de colores (ruta importante para el CRUD offline)
  '/manifest.json', // Manifest de la aplicación
  '/offline.html', // Página offline
  '/logo.svg', // Logo de la aplicación
  '/output.css', // Estilos generales
  '/main.tsx', // Punto de entrada de React

  // Archivos estáticos desde la carpeta 'public'
  '/colors.html',

  // Librerías externas (si son necesarias para offline)
  'https://cdnjs.cloudflare.com/ajax/libs/pouchdb/7.0.0/pouchdb.min.js',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css',
];

// Evento de instalación: cachear recursos iniciales
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Archivos cacheados:', urlsToCache);
      return cache.addAll(urlsToCache);
    }).catch((error) => {
      console.error('Error al cachear durante la instalación:', error);
    })
  );
});

// Evento de activación: limpiar caches antiguos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      )
    ).then(() => {
      console.log('Caches antiguos eliminados.');
    }).catch((error) => {
      console.error('Error al limpiar caches antiguos:', error);
    })
  );
});

// Evento de fetch: servir recursos desde la caché o red
self.addEventListener('fetch', (event) => {
  console.log('Interceptando fetch:', event.request.url);

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Si el recurso está en caché, devolverlo
      if (cachedResponse) {
        return cachedResponse;
      }

      // Si no está en caché, intentar hacer la solicitud a la red
      return fetch(event.request).catch(() => {
        // Si falla la red y la solicitud es para un documento, servir la página offline
        if (event.request.mode === 'navigate') {
          return caches.match('/offline.html');
        }
      });
    })
  );
});

// Manejo de notificaciones push (opcional)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Tienes una nueva notificación.',
    icon: '/logo.svg', // Cambia esto según tu ícono
    badge: '/logo.svg', // Cambia esto según tu badge
  };
  event.waitUntil(
    self.registration.showNotification('Notificación Push', options)
  );
});
