/**
 * Service Worker - Living Wetzlar Lounge Bar
 * P1 Feature: Pre-Caching + Offline Fallback
 * Version: 2.0.1
 */

const CACHE_VERSION = 'v2.0.1';
const CACHE_NAME = `living-wetzlar-${CACHE_VERSION}`;

// Critical assets to pre-cache on install
const PRECACHE_ASSETS = [
  '/',
  '/offline.html',
  '/404.html',
  '/favicon.svg',
  '/site.webmanifest',
  // Fonts (critical for LCP)
  '/fonts/Inter-Variable.woff2',
  '/fonts/PlayfairDisplay-Regular.woff2',
  '/fonts/PlayfairDisplay-Bold.woff2'
];

// Routes to cache on-demand
const RUNTIME_CACHE_ROUTES = [
  '/about',
  '/events',
  '/drinks-food',
  '/gallery',
  '/reservation',
  '/contact',
  '/impressum',
  '/datenschutz'
];

/**
 * Install Event: Pre-cache critical assets
 */
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker v' + CACHE_VERSION);

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Pre-caching critical assets');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => {
        console.log('[SW] Pre-cache complete');
        // Skip waiting to activate immediately
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Pre-cache failed:', error);
      })
  );
});

/**
 * Activate Event: Clean up old caches
 */
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker v' + CACHE_VERSION);

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              // Delete old cache versions
              return cacheName.startsWith('living-wetzlar-') &&
                     cacheName !== CACHE_NAME;
            })
            .map((cacheName) => {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        console.log('[SW] Activated. Taking control of all clients.');
        return self.clients.claim();
      })
  );
});

/**
 * Fetch Event: Cache-First Strategy with Network Fallback
 */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip cross-origin requests
  if (url.origin !== self.location.origin) {
    return;
  }

  // Skip API calls or dynamic content (if any)
  if (url.pathname.startsWith('/api/')) {
    return;
  }

  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          console.log('[SW] Serving from cache:', url.pathname);
          return cachedResponse;
        }

        // Not in cache, fetch from network
        console.log('[SW] Fetching from network:', url.pathname);
        return fetch(request)
          .then((networkResponse) => {
            // Don't cache non-OK responses
            if (!networkResponse || networkResponse.status !== 200) {
              return networkResponse;
            }

            // Clone response (can only be consumed once)
            const responseToCache = networkResponse.clone();

            // Cache HTML pages and static assets
            if (
              request.destination === 'document' ||
              request.destination === 'style' ||
              request.destination === 'script' ||
              request.destination === 'font' ||
              request.destination === 'image'
            ) {
              caches.open(CACHE_NAME).then((cache) => {
                console.log('[SW] Caching new resource:', url.pathname);
                cache.put(request, responseToCache);
              });
            }

            return networkResponse;
          })
          .catch((error) => {
            console.error('[SW] Fetch failed:', error);

            // Offline fallback for HTML pages
            if (request.destination === 'document') {
              return caches.match('/offline.html');
            }

            // For other resources, return nothing (browser will handle)
            return new Response('', {
              status: 408,
              statusText: 'Network timeout'
            });
          });
      })
  );
});

/**
 * Message Event: Handle messages from clients
 */
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('[SW] Received SKIP_WAITING message');
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_VERSION });
  }
});

/**
 * Sync Event: Background sync (for future use)
 */
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-data') {
    console.log('[SW] Background sync triggered');
    // Implement background sync logic here
  }
});

console.log('[SW] Service Worker script loaded');
