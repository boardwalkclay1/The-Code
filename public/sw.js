// sw.js — FINAL CLEAN VERSION
// • No broken icon caching
// • No missing-file crashes
// • No precache of files that may not exist
// • Pure Matrix PWA service worker

const CACHE = "thecode-v1";

// ONLY CACHE FILES THAT **EXIST**
const PRECACHE = [
  "/", 
  "/index.html",
  "/css/index.css",
  "/assets/js/index.js",
  "/modules/matrix.js",
  "/modules/loading.js",
  "/modules/sidebar.js",
  "/modules/sections.js",
  "/assets/img/code-index.png",
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

// FETCH
self.addEventListener("fetch", event => {
  const req = event.request;

  // Network-first for HTML navigation
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(cache => cache.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  // Cache-first for static assets
  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;

      return fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(cache => cache.put(req, copy));
          return res;
        })
        .catch(() => undefined);
    })
  );
});
