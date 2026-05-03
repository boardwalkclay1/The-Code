// sw.js — THE CODE (FINAL VERSION)
// • Clean, safe, no missing-file crashes
// • Only caches files that actually exist
// • Fully synced with Terminal Landing + Terminal 1
// • Pure Matrix PWA behavior

const CACHE = "thecode-v2";

// ONLY CACHE FILES THAT **EXIST** IN YOUR NEW STRUCTURE
const PRECACHE = [
  "/",
  "/index.html",

  // GLOBAL CSS
  "/css/index.css",

  // TERMINAL LANDING
  "/app/lessons/terminal/js/terminal-landing.js",

  // TERMINAL 1 (PREVIEW TERMINAL)
  "/app/lessons/terminal/js/terminal-master.js",
  "/app/lessons/terminal/js/command.js",

  // MATRIX ENGINE
  "/modules/matrix.js",

  // BRANDING
  "/assets/img/code-index.png",

  // PWA
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
