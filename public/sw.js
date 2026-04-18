/**
 * Service Worker — tsuchiyalab.com
 *
 * Tier 1 implementation:
 *   - Pre-cache critical static assets (install)
 *   - Network-first for HTML navigations
 *   - Cache-first for hashed Next.js / static assets
 *   - Stale-while-revalidate for images and fonts
 *   - Offline fallback page for navigations that fail with no cache hit
 *
 * Designed to be extended for Tier 2/3 (push, background-sync, badging).
 * See PRECACHE_URLS / event hooks at bottom for extension points.
 */

const CACHE_VERSION = "v1";
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `runtime-${CACHE_VERSION}`;
const HTML_CACHE = `html-${CACHE_VERSION}`;

const PRECACHE_URLS = [
  "/",
  "/offline",
  "/favicon.ico",
  "/favicon-16x16.png",
  "/favicon-32x32.png",
  "/apple-icon.png",
  "/manifest.webmanifest",
];

const ALL_CACHES = [STATIC_CACHE, RUNTIME_CACHE, HTML_CACHE];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(STATIC_CACHE);
      await Promise.allSettled(
        PRECACHE_URLS.map((url) =>
          fetch(url, { cache: "reload" })
            .then((res) => (res.ok ? cache.put(url, res) : null))
            .catch(() => null)
        )
      );
      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((k) => !ALL_CACHES.includes(k)).map((k) => caches.delete(k))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  if (req.method !== "GET") return;
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/_next/data/")) return;
  if (url.pathname.startsWith("/api/")) return;

  if (req.mode === "navigate") {
    event.respondWith(networkFirst(req));
    return;
  }

  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(cacheFirst(req, STATIC_CACHE));
    return;
  }

  const dest = req.destination;
  if (["image", "font", "style", "script"].includes(dest)) {
    event.respondWith(staleWhileRevalidate(req, RUNTIME_CACHE));
    return;
  }

  event.respondWith(networkFirst(req));
});

async function networkFirst(req) {
  const cache = await caches.open(HTML_CACHE);
  try {
    const fresh = await fetch(req);
    if (fresh.ok) cache.put(req, fresh.clone());
    return fresh;
  } catch (err) {
    const cached = await cache.match(req);
    if (cached) return cached;
    if (req.mode === "navigate") {
      const offline = await caches.match("/offline");
      if (offline) return offline;
    }
    throw err;
  }
}

async function cacheFirst(req, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  if (cached) return cached;
  const fresh = await fetch(req);
  if (fresh.ok) cache.put(req, fresh.clone());
  return fresh;
}

async function staleWhileRevalidate(req, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  const networkPromise = fetch(req)
    .then((res) => {
      if (res.ok) cache.put(req, res.clone());
      return res;
    })
    .catch(() => cached);
  return cached || networkPromise;
}

// ───────────────────────────────────────────────────────────
// Tier 2/3 extension hooks (commented out; uncomment when implementing)
// ───────────────────────────────────────────────────────────

// self.addEventListener("push", (event) => {
//   const data = event.data?.json() ?? {};
//   event.waitUntil(
//     self.registration.showNotification(data.title ?? "TSUCHIYA LAB", {
//       body: data.body,
//       icon: "/android-chrome-192x192.png",
//       badge: "/favicon-32x32.png",
//       data: { url: data.url ?? "/" },
//     })
//   );
// });
//
// self.addEventListener("notificationclick", (event) => {
//   event.notification.close();
//   event.waitUntil(self.clients.openWindow(event.notification.data?.url ?? "/"));
// });
