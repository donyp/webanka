/* One-time cleanup worker: drops old caches and unregisters itself.
   It deliberately does NOT reload or navigate clients, so it cannot
   create a refresh loop while the old cached page is still open. */
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.registration.unregister();
    })(),
  );
});
