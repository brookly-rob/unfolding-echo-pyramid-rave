const CACHE_NAME = 'riley-unfolding-echo-v1';
const urlsToCache = [
  'Dreamstate Echo Unfolding.html',
  'style.css', // If you ever move CSS to a separate file
  'script.js', // If you ever move JS to a separate file
  'manifest.json',
  // Placeholder for icons - you'll need to create these or use placeholders
  'images/icon-192x192.png',
  'images/icon-512x512.png',
  // You might need to dynamically cache loaded JSONs if you want them offline
  // but for now, the FileReader bypasses this for initial load.
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Optional: Clear old caches
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});