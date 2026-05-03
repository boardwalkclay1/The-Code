// sw.js — THE CODE (CLEAN NON-INTERFERING VERSION)
// • No JS caching
// • No terminal caching
// • No stale files
// • Only caches minimal shell

const CACHE = "thecode-v4";

const PRECACHE = [
  "/",
  "/index.html",
  "/css/index.css",
  "/manifest.json"
];

// INSTALL
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(PRECACHE))
  );
  self.skipWaiting();
});

// ACTIVATE
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => key !== CACHE ? caches.delete(key) : null)
      )
    )
  );
  self.clients.claim();
});

// FETCH — NETWORK FIRST FOR EVERYTHING
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
