// sw.js — simple, robust service worker with precache + runtime caching
const CACHE_VERSION = 'v1';
const PRECACHE = `precache-${CACHE_VERSION}`;
const RUNTIME = `runtime-${CACHE_VERSION}`;

// Files to precache — adjust paths to match your build
const PRECACHE_URLS = [
  '/', // index.html
  '/index.html',
  '/css/index.css',
  '/assets/js/index.js',
  '/modules/matrix.js',
  '/modules/loading.js',
  '/modules/sidebar.js',
  '/modules/sections.js',
  '/assets/img/code-index.png',
  '/assets/img/icon-192.png',
  '/assets/img/icon-512.png',
  '/manifest.json',
  '/offline.html' // optional offline fallback page (create this)
];

// Install: pre-cache core assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// Activate: clean up old caches
self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (!currentCaches.includes(key)) return caches.delete(key);
        })
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch: cache-first for static assets, network-first for navigation/API
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  // Always bypass service worker for chrome-extension and devtools requests
  if (url.protocol.startsWith('chrome-extension')) return;

  // Navigation requests (HTML pages) — network first, fallback to cache/offline
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Put a copy in the runtime cache
          const copy = response.clone();
          caches.open(RUNTIME).then(cache => cache.put(request, copy));
          return response;
        })
        .catch(() =>
          caches.match(request).then(match => match || caches.match('/offline.html'))
        )
    );
    return;
  }

  // Static assets (CSS, JS, images) — cache first
  if (request.destination === 'style' ||
      request.destination === 'script' ||
      request.destination === 'image' ||
      request.destination === 'font') {
    event.respondWith(
      caches.match(request).then(cachedResponse => {
        if (cachedResponse) return cachedResponse;
        return fetch(request).then(response => {
          // Cache a copy for later
          return caches.open(RUNTIME).then(cache => {
            cache.put(request, response.clone());
            return response;
          });
        }).catch(() => {
          // If image fails, optionally return a tiny placeholder or nothing
          if (request.destination === 'image') return caches.match('/assets/img/icon-192.png');
        });
      })
    );
    return;
  }

  // Default: try network, fallback to cache
  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});
