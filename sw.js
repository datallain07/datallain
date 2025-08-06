const CACHE_NAME = 'static-cache-v1';

// Cài đặt SW
self.addEventListener('install', event => {
  self.skipWaiting();
});

// Kích hoạt SW ngay
self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', event => {
  const req = event.request;
  const isHTML = req.headers.get('accept')?.includes('text/html');
  if (isHTML) {
    event.respondWith(
      fetch(req, { cache: 'no-store' })
        .then(res => {
          sendMessageToClients({ type: 'NEW_HTML_VERSION' });
          return res;
        })
        .catch(() => caches.match(req))
    );
  } else {
    event.respondWith(
      caches.match(req).then(cached => {
        return cached || fetch(req).then(res => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(req, res.clone());
            return res;
          });
        });
      })
    );
  }
});
function sendMessageToClients(msg) {
  self.clients.matchAll().then(clients => {
    clients.forEach(client => client.postMessage(msg));
  });
}